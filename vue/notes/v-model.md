# v-model



​	vue利用v-model达到数据双向绑定的效果，算是一个语法糖。



## 基本使用

```vue
<template>
	<div>
		<input v-model="username" type="text" />
    <div>{{ username }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  }
}
</script>
```



上面的示例，其实是以下代码的缩写（2.x版本）：

```vue
<template>
	<div>
		<input :value="username" @input="username = $event.target.value" type="text" />
    <div>{{ username }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  }
}
</script>
```

所以`v-model`其实是默认绑定了`value`，同时触发了`input`事件，这种形式使用于表单类的控件。

当然，这是针对`input="text"`组件的，对于select、checkbox等其他表单vue做了不同的处理。

## model选项

​	`value`和`input`，也是可以修改的，通过model选项即可。

​	如果定义了model选项，则表明该组件在被使用`v-model`传值时，` value`会对应选项`prop`，而`input事件`会对应选项中的`event`。

```vue
<!-- 子组件<Input /> -->
<template>
	<Input :value="title" @input="changeValue" />
	<div>
    <div>title: {{ title }}</div>
    <div>value: {{ value }}</div>
  </div>
</template>

<script>
export default {
  /*
   * 这里定义了model选项，表明父组件使用v-model时，
   * 相当于传递了title属性，同时监听myChange事件
   */
  model: {
    prop: 'title',
    event: 'myChange'
  },
  props: {
    title: String,
    value: String
  },
  methods: {
    changeValue(e) {
      this.$emit('myChange', e)
    }
  }
}
</script>
```

```vue
<!-- 父组件 -->
<template>
	<div>
    <Input v-model="username" />
    <!-- 相当于 -->
    <Input :title="username" @myChange="username = $event.target.value" />
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
export default {
  components: { Input },
  data() {
    return {
      username: ''
    }
  }
}
</script>
```





## .sync修饰符

​	此修饰符是实现`props`选项内的属性的双向绑定的一个语法糖

不使用`.sync`的情况

```vue
<!-- 子组件 <Number /> -->
<template>
	<div>
    <span>{{ number }}</span>
    <button @click="changeNumber">修改数字</button>
  </div>
</template>
<script>
export default {
  props: {
    number: Number
  },
  methods: {
    changeNumber() {
      this.$emit('changeNumber', Math.random())
    }
  }
}
</script>

<!-- 父组件 -->
<template>
	<div>
    <Number :number="number" @changeNumber="number = $event"></Number>
  </div>
</template>
<script>
export default {
  data() {
    return {
      number: 1
    }
  }
}
</script>
```

使用`.sync`的写法

```vue
<!-- 子组件 <Number /> -->
<template>
	<div>
    <span>{{ number222 }}</span>
    <button @click="changeNumber">修改数字</button>
  </div>
</template>
<script>
export default {
  props: {
    number222: Number
  },
  methods: {
    changeNumber() {
      // 固定使用update:propName的形式触发事件
      this.$emit('update:number222', Math.random())
    }
  }
}
</script>

<!-- 父组件 -->
<template>
	<div>
    <Number :number222.sync="number"></Number>
  </div>
</template>
<script>
export default {
  data() {
    return {
      number: 1
    }
  }
}
</script>
```





## vue3的相关变更



### 基本使用

```vue
<input v-model="username" />

<!-- 相当于以下代码的简写 -->
<input :modelValue="username" @update:modelValue="username = $event" />
```



### v-model的参数

可以当作是`.sync`修饰符的代替

```vue
<input v-model:title="username" v-model:aaa="password" />

<!-- 相当于以下代码的简写 -->
<input
       :title="username"
       @update:title="username = $event"
       :aaa="password"
       @update:aaa="password = $event" />
```





### v-model的自定义修饰符

​	2.x中有默认提供的修饰符`.number`、`.trim`、`.lazy`。

​	3.x以后，我们可以使用自定义修饰符了，修饰符将会以`modelModifiers`的形式传递给子组件。

​	`modelModifiers`是一个对象，里面包含了所有的修饰符属性。

​	例如传递的是`v-model.aaa.bbb="username"`，则`modelModifiers`为：

```javascript
modelModifiers: {
  aaa: true,
  bbb: true
}
```

​	所以要实现修饰符的方式，就是判断对应修饰符是否为true，如果为true，做好自己要做的处理以后，触发`update:modelValue`事件，并将结果作为参数返回。



