

## Vue3速记



### 一、安装和运行

- 使用vite模板

  ```shell
  # 下载脚手架模板，手动设置项目名、选择vue-ts
  npm init vite@latest
  # or
  # npm init vite@latest my-vite-project --template vue-ts
  
  # 安装依赖
  cd my-vite-project
  npm i
  
  # 运行
  npm run dev
  
  ```

  



### 二、计算属性

```javascript
const user = reactive({
  name: '张三',
  age: 18
})

// 写法一
const result1 = computed(() => {
  return user.name + user.age
})

// 写法二
const result1 = computed({
  get() {
    return user.name + '_' + user.age
  },
  set(value) {
    const [name, age] = value.split('_')
    user.name = name
    user.age = age
  }
})
```



### 三、监听属性

```javascript
const result2 = ref('')

watch(user, ({ name, age }) => {
  result2.value = `${name}_${age}`
}, { immediate: true })


// 可监听多个属性
const user = reactive({ name: 'jeffrey', age: 26 })
const obj = reactive({ a: 1, b: 2 })
watch([user, obj], () => {
  result2.value = `${user.name}_${user.age}_${obj.a}_${ obj.b }`
}, { immediate: true })
// 只监听对象中的某个值
watch([() => user.name, () => obj.b], () => {
  result2.value = `${user.name}_${user.age}_${obj.a}_${ obj.b }`
}, { immediate: true })
```



### 四、高级监听 watchEffect

​	立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

```javascript
/* 基本用法 */
watchEffect(() => {
  result2.value = `${user.name}_${user.age}`
})

/* 可接收一个参数，onInvalidate回调函数 */
const msg = ref(0)
watchEffect(onInvalidate => {
  console.log(1, msg.value)
  console.log(2, msg.value)
  onInvalidate(() =>{
    console.log(3, msg.value)
  })
})
// 默认第一次不触发，之后每次都是第一个触发
// 即，第一次加载页面，输出：1 2
// 之后监听的数据有更新，输出：3 1 2

/* 返回一个可以停止监听的回调函数 */
const stopWatch = watchEffect(() => {})
stopWatch()	// 调用之后就不会再监听了，同时也会触发最后一次onInvalidate

/* 第一个参数是配置项 */
```







### 五、Refs



#### ref



#### toRef

​	取出对象中的某个变量，将其包装成响应式的变量。

```
const obj = reactive({
    foo: 1,
    bar: 2
})
const foo = toRef(obj, 'foo')
foo.value++	// obj.foo == 3;foo.value == 3
```

#### toRefs

​	可以解决reactive()解构出来的变量不是响应式的问题

```javascript
const obj = {
    foo: 1,
    bar: 2
}
// 直接解构出来，然后修改foo、bar，是不存在响应式的，他就是一个普通的值
const { foo, bar } = reactive(obj)

// 利用toRefs，把解构出来的变量包装一下，变成响应式的变量
const state = reactive(obj)
const { foo, bar } = toRefs(state)
```

#### toRaw

​	将响应式的变量转回原始静态的变量，可节省内存等...

```javascript
const obj = reactive({
    foo: 1
})
const raw = toRaw(obj)
```





### 六、生命周期

- onBeforeMount
- onMounted
- onBeforeUpdate
- onUpdated
- onBeforeUnmount
- onMounted

```vue
<script setup lang="ts">

import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue';

const count = ref(0)

const addOne = () => {
  count.value++
}

onBeforeMount(() => { console.log('onBeforeMount') })
onMounted(() => { console.log('onMounted') })
onBeforeUpdate(() => { console.log('onBeforeUpdate') })
onUpdated(() => { console.log('onUpdated') })
onBeforeUnmount(() => { console.log('onBeforeUnmount') })
onUnmounted(() => { console.log('onUnmounted') })

</script>

<template>
  <div>{{ count }}</div>
  <button @click="addOne">+1</button>
</template>
```



### 七、组件之间的通信

- **defineProps：**定义从父组件接收的属性
- **defineEmits：**定义触发给父组件的事件，返回一个emit函数可调用
- **defineExpose：**定义暴露给父组件直接调用的属性（变量 or 函数）

#### 1.父组件给子组件传值

​	子组件使用defineProps接收，此方法不需要import，只要写在setup中即可。

**child.vue**

```vue
<script setup lang="ts">

type Props = {
  title?: string	// 加问号表示非必填
  list: number[]
}
    
// 不设置默认值，直接定义
// defineProps<Props>()

// 设置默认值，用withDefaults
// 将属性解构出来使用，在setup中需要使用时才这样做，template中可以不用解构就直接使用
const { title, list } = withDefaults(defineProps<Props>(), {
    title: '子组件的默认值'
})

</script>


<template>
  <div>{{ title }}</div>
  <div>{{ list }}</div>
</template>
```

**super.vue**

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import Child from './Child.vue'

const superList = reactive<number[]>([1, 2, 3])

</script>

<template>
  <child title="父组件给的title" :list="superList"></child>
</template>
```





#### 2.子组件传值给父组件

利用defineEmits()，传递一个组件，会返回一个emit函数，调用此函数即可触发事件

**Child.vue**

```vue
<script setup lang="ts">

const emit = defineEmits(['sendMsg'])

const sendMsg = () => {
  emit('sendMsg', '来自子组件的消息')
}
</script>

<template>
  <button @click="sendMsg">传递给父组件</button>
</template>
```

**Super.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'

const childMsg = ref('')

const getMsg = (msg: string) => {
  childMsg.value = msg
}
</script>

<template>
  <div>
    <p>来自子组件的消息：{{ childMsg }}</p>
  </div>
</template>
```



#### 3.定义子组件暴露给父组件的属性

**child.vue**

```vue
<script setup lang="ts">

import { reactive, ref } from 'vue'

const childInfo = reactive({
  name: 'jeffrey',
  age: 26
})
const childAttr = ref('子组件的属性')
const childFoo = () => {
  childInfo.name = 'jeffrey' + Math.random()
}
defineExpose({
  childInfo,
  childAttr,
  childFoo
})
</script>

<template>
  <div>childInfo: {{ childInfo }}</div>
  <div>childAttr: {{ childAttr }}</div>
</template>
```

**super.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'

const childMsg = ref('')

type childRef = {
  childInfo: {
    name: string,
    age: number
  },
  childAttr: object,
  childFoo: Function
}
const childRef = ref<childRef|null>(null)
const checkChildAttr = () => {
  console.log(childRef.value!.childInfo)
}
</script>

<template>
  <child ref="childRef"></child>
  <button @click="checkChildAttr">查看子组件暴露出来的属性</button>
</template>
```



### 八、组件

#### 1.全局组件

main.ts

```typescript
import { createApp } from 'vue'
import App from './App.vue'

import Table from './components/Table.vue'

// 注册要放在mount之前
createApp(App).components('base-table', Table).mount('#app')

```



#### 2.局部组件

在具体组件内引入即可



#### 3.循环组件

**types.ts**

```typescript
type TreeType = {
  label: string,
  children?: TreeType[]
}

export type {
  TreeType
}
```



**Tree.vue**

```vue
<script setup lang="ts">
import type { TreeType } from './types'

type Props = {
  list: TreeType[] | undefined
}

defineProps<Props>()

</script>


<template>
  <div v-for="(tree, index) in list" :key="index" class="tree">
    {{ tree.label }}
    <Tree v-if="tree.children?.length" :list="tree.children"></Tree>
  </div>
</template>

<style lang="less" scoped>
.tree {
  padding-left: 12px;
}
</style>
```



**App.vue**

```vue
<script setup lang="ts">
import { reactive } from 'vue';
import Tree from './components/Tree/Tree.vue'
import { TreeType } from './components/Tree/types'

const treeList = reactive<TreeType[]>(
  [
     {
        label: 'T1',
        children: [
          { label: 'T1-1' },
          { label: 'T1-2', children: [{ label: 'T1-2-1' }] }
        ]
      },
      {
        label: 'T2',
        children: [
          { label: 'T2-1' },
          { label: 'T2-2' }
        ]
      }
    ]
)

</script>

<template>
  <Tree :list="treeList" />
</template>
```





#### 4.动态组件

在setup中，不能使用字符串给component的is属性，需要直接传递组件。除非改成Vue2的写法（在components选项中注册组件）

**types.ts**

```typescript
type TabType = {
  label: string,
  component: any
}

export type {
  TabType
}
```



**Tab.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TabType } from './types'

type Props = {
  list: TabType[]
}

const { list } = defineProps<Props>()

let currTab = ref<TabType>(list[0])

const clickTab = (item: TabType) => {
  currTab.value = item
}

</script>

<template>
  <div class="tab">
    <div
      class="tab-item"
      v-for="(item, index) in list"
      :key="index"
      @click="clickTab(item)">
      {{ item.label }}
    </div>
  </div>
  <component :is="currTab?.component"></component>
</template>

<style lang="less" scoped>
.tab {
  display: flex;
  &-item {
    border: 1px solid #ccc;
    padding: 8px 24px;
    cursor: pointer;
    &:hover {
      background-color: antiquewhite;
    }
  }
}
</style>
```

**App.vue**

```vue
<script setup lang="ts">
import { ref, markRaw, reactive } from 'vue';

import Tab from './components/Tab/Tab.vue'
import { TabType } from './components/Tab/types'

import A from './components/Tab/A.vue'
import B from './components/Tab/B.vue'
import C from './components/Tab/C.vue'

const tabList = reactive<TabType[]>([
  {
    label: 'A选项卡',
    // markRaw是因为这个组件肯定是不变的，为了提高性能，不用将其设置为响应式的属性
    component: markRaw(A)
  },
  {
    label: 'B选项卡',
    component: markRaw(B)
  },
  {
    label: 'C选项卡',
    component: markRaw(C)
  },
])

</script>

<template>
  <Tab :list="tabList"/>
</template>
```



### 九、插槽

- **默认插槽**
- **命名插槽**
- **作用域插槽**
- **动态插槽**



#### 1.默认插槽

​	子组件内部写`<slot></slot>`，父组件引用时，直接在标签内写内容即可。

#### 2.具名插槽

​	子组件定义时设置name属性`<slot name="aaa"></slot>`，父组件引用则加上`v-slot:aaa`；

​	对于默认插槽，则使用`v-slot:default`；

​	另外`v-slot`看直接简写为`#`，即`#aaa`

#### 3.作用域插槽

```vue
<!-- 子组件 -->
<template>
  <div v-for="(item, index) in personList" :key="item.id">
    <slot :row="item" :index="index"></slot>
  </div>
</template>

<!-- 父组件 -->
<template>
  <ChildSlot>
    <template #default="{ row, index }">
      <p>index: {{ index }}</p>
      <p>row: {{ row }}</p>
    </template>
  </ChildSlot>
</template>
```



#### 4.动态插槽

​	使用中括号，放变量即可。

**DynamicSlot.vue**

```vue
<template>
  <div class="B">
    <slot name="A"></slot>
  </div>
  <div class="A">
    <slot name="B"></slot>
  </div>
</template>

<style lang="less" scoped>
.A {
  background-color: red;
}
.B {
  background-color: aqua;
}
</style>
```

**App.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import DynamicSlot from './components/DynamicSlot.vue';

const currContent = ref('A')

const switchContent = (name: string) => {
  currContent.value = name
}

</script>

<template>
  <button @click="switchContent('A')">A</button>
  <button @click="switchContent('B')">B</button>
  <DynamicSlot>
    <template #[currContent]>{{ currContent }}</template>
  </DynamicSlot>
</template>
```



### 十、异步组件

**axios.ts**

写一个发送请求的工具

```typescript
type person = {
  id: number,
  name: string
}

export const get = (url: string): Promise<person[]> => {
  return new Promise((resolve) => {
    const xhr: XMLHttpRequest = new XMLHttpRequest()

    xhr.open('GET', url)

    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200) {
        setTimeout(() => {
          resolve(JSON.parse(xhr.responseText))
        }, 2000)
      }
    }

    xhr.send(null)
  })
}

export default {
  get
}
```

**AsyncComponent.vue**

此组件异步调用数据，await在setup可以直接写。

```vue
<script setup lang="ts">
import { reactive } from 'vue';
import axios from './axios'

const list = reactive(await axios.get('data.json'))

</script>

<template>
  <div v-for="item in list" :key="item.id">{{ item }}</div>
</template>
```

**App.vue**

使用`defineAsyncComponent`定义一个异步组件，传一个函数，返回具体组件。

异步组件需要放在`<Suspense>`标签中，内有两个插槽，`#fallback`会在请求完成之前显示，`#default`则在请求完成之后显示。

```vue
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const AsyncComponent = defineAsyncComponent(() => import('./components/AsyncComponent/AsyncComponent.vue'))
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncComponent></AsyncComponent>
    </template>
    <template #fallback>
      loading...
    </template>
  </Suspense>
</template>
```



### 十一、Teleport 传送组件

​	teleport是一个内置组件，可以直接指定组件内容放在哪个节点下，且不受父组件的影响，例如style、v-show等。

**BaseTeleport.vue**

```vue
<template>
  <teleport to="body">
    <div class="base-teleport">BaseTeleport</div>
  </teleport>
</template>
```

**App.vue**

```vue
<script setup lang="ts">
import BaseTeleport from './components/BaseTeleport.vue'
</script>

<template>
  <!-- 这里的组件内容还是会显示，因为teleport的to属性指向了body -->
  <BaseTeleport v-show="false"></BaseTeleport>
</template>
```



### 十二、keep-alive

被`<keep-alive>`包裹的组件，可以缓存组件状态。

[在动态组件上使用 `keep-alive`](https://v3.cn.vuejs.org/guide/component-dynamic-async.html#%E5%9C%A8%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6%E4%B8%8A%E4%BD%BF%E7%94%A8-keep-alive)

#### 1.应用在component组件

**A.vue** / **B.vue**

```vue
<script setup lang="ts">
import { reactive } from 'vue';
const form = reactive({
  username: '',
  password: ''
})
</script>

<template>
  <h1>登录</h1>
  <div>
    <span>用户名：</span>
    <input v-model="form.username" type="text">
  </div>
  <div>
    <span>密码：</span>
    <input v-model="form.password" type="text">
  </div>
</template>
```



**BaseKeepAlive.vue**

```vue
<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';

const Login = defineAsyncComponent(() => import('./A.vue'))
const Register = defineAsyncComponent(() => import('./B.vue'))

const currCom = ref(Login)

const setCurrCom = (target: string) => {
  switch(target) {
    case 'login':
      currCom.value = Login
      break
    case 'register':
      currCom.value = Register
      break
  }
}
</script>

<template>
  <button @click="setCurrCom('login')">登录</button> | 
  <button @click="setCurrCom('register')">注册</button>
  <keep-alive>
    <component :is="currCom"></component>
  </keep-alive>
</template>
```



#### 2.新增的生命周期

- **onActivated：**在每次显示时会调用，第一次渲染会在onMounted之后调用。
- **onDeactivated：**在每次隐藏时调用，父组件销毁后，会在onUnmounted之前调用。

【注意】用了keep-alive组件包裹之后才有这俩生命周期钩子。



**A.vue**

```vue
<script setup lang="ts">
import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive
} from 'vue';

const form = reactive({
  username: '',
  password: ''
})

onBeforeMount(() => { console.log('onBeforeMount') })
onMounted(() => { console.log('onMounted') })
onActivated(() => { console.log('onActivated') })
onDeactivated(() => { console.log('onDeactivated') })
onBeforeUpdate(() => { console.log('onBeforeUpdate') })
onUpdated(() => { console.log('onUpdated') })
onBeforeUnmount(() => { console.log('onBeforeUnmount') })
onUnmounted(() => { console.log('onUnmounted') })

</script>

<template>
  <h1>注册</h1>
  <div>
    <span>用户名：</span>
    <input v-model="form.username" type="text">
  </div>
  <div>
    <span>密码：</span>
    <input v-model="form.password" type="text">
  </div>
</template>
```



#### 3.可传属性

- **include：**`string | RegExp | Array`。只有名称匹配的组件会被缓存。
- **exclude：**`string | RegExp | Array`。任何名称匹配的组件都不会被缓存。
- **max：**`number | string`。最多可以缓存多少组件实例。





### 十三、transition 动画

[transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition)



#### 1.结合Animate.css动画库使用

[Animate.css](https://animate.style/)

可结合`animate.css`一起使用，只需要配置动画的className即可，具体看文档。

```shell
npm i animate.css
```

**TransitionAnimate.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import 'animate.css'
const toggle = ref(false)

const switchToggle = () => {
  toggle.value = !toggle.value
}
</script>

<template>
<button @click="switchToggle">切换</button>
<transition
  :duration="{enter: 50, leave: 500}"
  enter-active-class="animate__animated animate__shakeX"
  leave-active-class="animate__animated animate__fadeOutTopLeft">
  <div v-show="toggle" class="box"></div>
</transition>
</template>


<style lang="less" scoped>
.box {
  width: 300px;
  height: 300px;
  background-color: aquamarine;
}
</style>
```



#### 2.transition的生命周期

- `before-enter`
- `before-leave`
- `enter`
- `leave`
- `appear`
- `after-enter`
- `after-leave`
- `after-appear`
- `enter-cancelled`
- `leave-cancelled` (仅 `v-show`)
- `appear-cancelled`

```vue
<script setup lang="ts">
import { ref } from 'vue'

const enterFrom = (el: Element) => { console.log('enterFrom') }
const enterActive = (el: Element, done: Function) => {
  console.log('enterActive')
  setTimeout(() => { done() }, 3000)
}
const enterTo = (el: Element) => { console.log('enterTo') }
const enterCancel = (el: Element) => { console.log('enterCancel') }

const leaveFrom = (el: Element) => { console.log('leaveFrom') }
const leaveActive = (el: Element, done: Function) => {
  
  console.log('leaveActive')
  setTimeout(() => { done() }, 3000)
}
const leaveTo = (el: Element) => { console.log('leaveTo') }
const leaveCancel = (el: Element) => { console.log('leaveCancel') }

const toggle = ref(false)

const switchToggle = () => { toggle.value = !toggle.value}

</script>


<template>
  <button @click="switchToggle">开关</button>
  <transition
    @before-enter="enterFrom"
    @enter="enterActive"
    @after-enter="enterTo"
    @enter-cancelled="enterCancel"
    @before-leave="leaveFrom"
    @leave="leaveActive"
    @after-leave="leaveTo"
    @leave-cancelled="leaveCancel">
    <div v-show="toggle" class="box"></div>
  </transition>
</template>



```



#### 3.结合GreenSock

**安装**

```shell
npm i gsap
```

**引入**

```shell
import gsap from 'gsap'
```

**TransitionGSAP.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import gsap from 'gsap'

const beforeEnter = (el: Element) => {
  gsap.set(el, {
    width: 0,
    height: 0,
    backgroundColor: 'red'
  })
}
const enter = (el: Element, done: gsap.Callback) => {
  gsap.to(el, {
    width: 200,
    height: 200,
    backgroundColor: 'green',
    onComplete: done
  })
}
const leave = (el: Element, done: gsap.Callback) => {
  gsap.to(el, {
      width: 0,
      height: 0,
      backgroundColor: 'red',
    onComplete: done
    })
}

const toggle = ref(false)

const switchToggle = () => { toggle.value = !toggle.value}

</script>


<template>
  <button @click="switchToggle">开关</button>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave">
    <div v-show="toggle" class="box"></div>
  </transition>
</template>
```



**其他案例**

**TransitionGSAPNumber.vue 数字滚动**

```vue
<script setup lang="ts">
import { reactive, watch } from 'vue';
import gsap from 'gsap';

const number = reactive({
  current: 0,
  tweenNumber: 0
})

watch(() => number.current, (newValue) => {
  gsap.to(number, {
    duration: .5,
    tweenNumber: newValue
  })
})

</script>

<template>
  <input v-model="number.current" type="text">
  <p style="font-size: 48px;">{{ number.tweenNumber.toFixed(0) }}</p>
</template>
```





#### 4.appear

​	首次加载页面时执行。



#### 5.transition-group

```vue
<script setup lang="ts">
import { reactive } from 'vue';
import 'animate.css'
const list = reactive([1,2,3])

const add = () => {
  list.push(list.length + 1)
}
const pop = () => {
  list.pop()
}
</script>


<template>
  <button @click="add">ADD</button>
  <button @click="pop">POP</button>
  
  <div class="list">
    <transition-group
      enter-active-class="animate__animated animate__jackInTheBox"
      leave-active-class="animate__animated animate__hinge">
      <div class="box" v-for="item in list" :key="item">{{ item }}</div>
    </transition-group>
  </div>

</template>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  
}
.box {
  font-size: 48px;
  padding: 48px;
}
</style>
```



#### 6.move-class 覆盖移动过渡期间应用的 CSS 类

```vue

<script setup lang="ts">
import { ref } from 'vue'
import lodash from 'lodash'

const list = ref(Array.apply(null, { length: 81 } as number[]).map((_, index) => { return { id: index, number: index % 9 + 1}}))

console.log(list.value)


const mash = () => {
  list.value = lodash.shuffle(list.value)
}
</script>

<template>
  <button @click="mash">打乱</button>
  <div class="list">
    <transition-group move-class="mm">
      <div class="box" v-for="item in list" :key="item.id">{{ item.number }}</div>
    </transition-group>
  </div>
</template>


<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  width: calc(80px * 9);
  .box {
    box-sizing: border-box;
    border: 1px solid #000;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
  }
}
.mm {
  transition: all 0.5s;
}
</style>
```





### 十四、依赖注入 Provide / Inject

解决super组件层层props传递属性导致很麻烦的问题。

super组件用provide传递属性，children组件用inject得到属性。

如果需要响应式，就用传递用ref或reactive转化过的属性；而在TS中，children组件在inject后，若需要修改属性状态，需要在inject时就提前声明好对应类型。

```typescript
import { inject, Ref, ref } from 'vue';
// 第二个参数是设置默认值，主要为了解决存在undefined的可能
const bbb = inject<Ref<boolean>>('root', ref(false))
```







### 十五、自动识别引入常用API

**安装**

```shell
npm i -D unplugin-auto-import
```

**配置**

```js
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [vue(), VueJsx(), AutoImport({
        imports: ['vue'],
        dts: 'src/auto-import.d.ts'
    })]
})
```

​	配置生效后，会在`src`下生成一个声明文件`auto-import.d.ts`，之后就不需要手动引入一些常用的api了，工具会自动判断且引入。





### 十六、v-model

[官方文档](https://v3.cn.vuejs.org/guide/migration/v-model.html#%E6%A6%82%E8%A7%88)

【与Vue2.2的区别】

- props：value => modelValue
- 事件：input => update:modelValue
- .sync修饰符移除
- Vue3支持多个v-model
- 支持新增自定义修饰符，通过props中的modelModifiers接收



**VModel.vue**

```vue
<script setup lang="ts">
import Child from './Child.vue'

const title = ref('我是标题')
const flag = ref(false)

const updateContent = () => {
  title.value = `我是标题${ Math.random() }`
  flag.value = !flag.value
}

</script>

<template>
  <button @click="updateContent">更新内容</button>
  <Child v-model:title.En="title" v-model:flag="flag"></Child>
</template>
```

**Child.vue**

```vue
<script setup lang="ts">

type Props = {
  title: string,
  flag: boolean,
  titleModifiers: {	// 自定义修饰符 xxxModifiers: { ... }
      En: boolean
  }
}

const props = defineProps<Props>()

// 定义事件，实现双向绑定
const emit = defineEmits(['update:title', 'update:flag'])

const updateContent = () => {
  if(props.titleModifiers?.En) {
  	emit('update:title', `I'm a title ${ Math.random() }`)
  } else {
  	emit('update:title', `我是标题${ Math.random() }`)
  }
  emit('update:flag', !props.flag)
}

</script>

<template>
  <div>
    <p>标题: {{ title }}</p>
    <p>FLAG: {{ flag }}</p>
    <button @click="updateContent">Child 更新数据</button>
  </div>
</template>
```



### 十七、自定义指令

- 规定写法，必须以v开头。

- 定义时，可以是一个Directive类型的对象，也可以是一个函数（函数的前提是只关心`mounted`和`updated`的情况）。
- 钩子函数会接收到四个参数：元素、绑定的属性、虚拟DOM以及前置VDOM



**VDirective.vue**

```vue
<script setup lang="ts">

import { Directive, DirectiveBinding } from 'vue'

const vLoading: Directive = {
  created () {
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted (el: HTMLElement, binging: DirectiveBinding) {
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated(el: HTMLElement, binging: DirectiveBinding) {
    const { value } = binging
    if(value) {
      el.innerHTML = 'loading....'
    } else {
      el.innerHTML = '加载完成！'
    }
  },
  beforeUnmount () {
    console.log('beforeUnmount')
  },
  unmounted () {
    console.log('unmounted')
  }
}

const isLoading = ref(false)

</script>


<template>
  <div v-loading="isLoading"></div>
  <button @click="isLoading=!isLoading">loading</button>
</template>

```

**函数式写法**

```vue
<script setup lang="ts">

import { Directive, DirectiveBinding } from 'vue'

const vLoading = (el: HTMLElement, binging: DirectiveBinding) => {
    const { value } = binging
    if(value) {
      el.innerHTML = 'loading....'
    } else {
      el.innerHTML = '加载完成！'
    }
}

const isLoading = ref(false)

</script>


<template>
  <div v-loading="isLoading"></div>
  <button @click="isLoading=!isLoading">loading</button>
</template>
```





### 十八、Hooks

自定义hooks

**useBase64.tx**

```typescript

type Options = {
  el: string
}

export default function(opions: Options):Promise<string> {
  return new Promise((resolve, reject) => {

    onMounted(() => {
      const img = document.querySelector(opions.el) as HTMLImageElement
      img.onload = () => {
        resolve(toBase64(img))
      }
    })
    const toBase64 = (el: HTMLImageElement) => {

      const canvas = document.createElement('canvas')
      canvas.width = el.width
      canvas.height = el.height
      const ctx = canvas.getContext('2d')
  
      ctx?.drawImage(el, 0, 0, el.width, el.height)
  
      return canvas.toDataURL('image/png')
    }
  })

  
}
```





### 十九、定义全局函数和变量

​	Vue3没有prototype可以使用，因为没有this，配置全局函数和变量，可以借助`app.config.globalProperties.xxx`实现。



**main.ts**

```typescript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 定义Filter Type
type Filter = {
  formatStr: Function
}
// 声明$filters，避免编译时报错
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: Filter
  }
}
// 定义全局$filters
app.config.globalProperties.$filters = {
  formatStr: (value: string): string => {
    return `真·${ value }`
  }
}

app.mount('#app')
```



### 二十、插件



写一个loading插件，直接以遮罩层形式放置在顶层。

**loading.vue**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isShow = ref<boolean>(false)

const show = () => {
  isShow.value = true
}

const hide = () => {
  isShow.value = false
}

// 将显示、隐藏的方法暴露出去
defineExpose({
  isShow,
  show,
  hide
})

</script>


<template>
  <div class="loading" v-show="isShow">loading...</div>
</template>


<style lang="less" scoped>
.loading {
  width: 100%;
  height: 100%;
  font-size: 48px;
  background-color: rgba(0, 0, 0, .8);
  color: #FFF;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
```

**插件  index.ts**

```typescript
import { App, createVNode, render, VNode } from 'vue'

import PluginLoading from './Index.vue'

export default {
  install(app: App) {
    // 将模板文件转化为虚拟DOM
    const vNode: VNode = createVNode(PluginLoading)
	// 渲染虚拟DOM，否则vNode.component会是一个null
    render(vNode, document.body)
	// 配置全局变量$loading，将暴露出来的show、hide方法放在对象中
    app.config.globalProperties.$loading = {
      show: vNode.component?.exposed?.show,
      hide: vNode.component?.exposed?.hide
    }
    
  }
}
```

**安装插件 main.ts**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import PluginLoading from './plugins/loading'

const app = createApp(App)
app.use(PluginLoading)

// 声明类型
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $loading: {
      show: () => void,
      hide: () => void
    }
  }
}

app.mount('#app')
```

**使用 App.vue**

```vue
<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance } from 'vue'
// 获取组件实例
const { appContext } = getCurrentInstance() as ComponentInternalInstance

const showLoading = () => {
  // 从组件实例的globalProperties拿到暴露出来的函数
  const { show, hide } = appContext.config.globalProperties.$loading

  show()	// 调用show

  setTimeout(() => {
    hide()	// 两秒后隐藏
  }, 2000)
}

</script>

<template>
  <button @click="showLoading">获取数据</button>
</template>
```





### 二十一、样式



#### less相关



##### :deep()

使用less的话可以用deep解决

```less
<style lang="less" scoped>
.input-wrapper {
    :deep(input) {
        background-color: 'red';
    }
}
</style>
```



##### :slotted()

可定义插槽内的样式

```less
<style lang="less" scoped>
.input-wrapper {
    :slotted(input) {
        background-color: 'red';
    }
}
</style>
```



##### :global()

定义全局样式



#### 状态驱动的动态 CSS



```vue
<script setup lang="ts">
  const bgColor = ref('pink')
  const changeColor = () => {
    bgColor.value === 'pink'
      ? (bgColor.value = 'antiquewhite')
      : (bgColor.value = 'pink')
  }
</script>

<template>
  <button @click="changeColor">change color</button>
  <div class="box"></div>
</template>


<style scoped>
.box {
  width: 200px;
  height: 200px;
  background-color: v-bind(bgColor);
}
</style>
```



#### module

vue3新增了module css，具体使用方式看[文档](https://v3.cn.vuejs.org/api/sfc-style.html#style-module)



### 二十二、响应式原理

Proxy



### 二十三、Pinia

比vuex更好用。

#### 1.基本使用



**安装**

```shell
npm i pinia -S
```

**引入**

```typescript
import { createPinia } from 'pinia'

const store = createPinia

app.use(store)
```

**定义一个store**

```typescript
import { defineStore, StoreDefinition } from 'pinia'

export const useStore: StoreDefinition = defineStore('main', {
  state: () => ({
    count: 0
  })
})

export default useStore
```

**使用**

```vue
<script setup lang="ts">
import { useStore } from './store/store'

const { count } = useStore()
</script>

<template>
  <div>{{ count }}</div>
</template>

```





#### 2.修改状态

五种方式：

1. 直接修改状态值；

   ```vue
   <script setup lang="ts">
   import { useStore } from './store/store'
   
   const store = useStore()
   
   const updateState = () => {
     store.count++
   }
   </script>
   
   <template>
     <button @click="updateState">change state</button>
     <div>count: {{ store.count }}</div>
   </template>
   
   ```

2. 使用$patch，传入一个对象，批量修改状态；

   ```vue
   <script setup lang="ts">
   import { useStore } from './store/store'
   
   const store = useStore()
   
   const updateState = () => {
     store.$patch<any>({ count: 1, name: 'asd' })
   }
   </script>
   
   <template>
     <button @click="updateState">change state</button>
     <div>name: {{ store.name }}</div>
     <div>count: {{ store.count }}</div>
   </template>
   
   ```

3. 使用$patch，传入一个函数，可以在函数内部写逻辑进行处理；

   ```vue
   <script setup lang="ts">
   import { useStore } from './store/store'
   
   const store = useStore()
   
   const updateState = () => {
     store.$patch((state) => {
       state.count++
       state.name = 'asda???'
     })
   }
   </script>
   
   <template>
     <button @click="updateState">change state</button>
     <div>name: {{ store.name }}</div>
     <div>count: {{ store.count }}</div>
   </template>
   
   ```

4. 使用$state；

   ```vue
   <script setup lang="ts">
   import { useStore } from './store/store'
   
   const store = useStore()
   
   const updateState = () => {
     store.$state = {
       count: store.count + 1
     }
   }
   </script>
   
   <template>
     <button @click="updateState">change state</button>
     <div>name: {{ store.name }}</div>
     <div>count: {{ store.count }}</div>
   </template>
   
   ```

5. 借助actions进行修改。

   **store.ts**

   ```typescript
   import { defineStore, StoreDefinition } from 'pinia'
   
   export const useStore: StoreDefinition = defineStore('main', {
     state: () => ({
       count: 0,
       name: 'aaa'
     }),
     actions: {
       setCount() {
         this.count++
         this.name = `aaa${ Math.random() }`
       }
     }
   })
   
   export default useStore
   ```

   **App.vue**

   ```vue
   <script setup lang="ts">
   import { useStore } from './store/store'
   
   const store = useStore()
   
   const updateState = () => {
     store.setCount()
   }
   </script>
   
   <template>
     <button @click="updateState">change state</button>
     <div>name: {{ store.name }}</div>
     <div>count: {{ store.count }}</div>
   </template>
   
   ```

   

#### 3.解构后的状态响应式处理

`pinia`提供的`storeToRefs`可以让解构处理的状态是响应式的。

```vue
<script setup lang="ts">
import { useStore } from './store/store'
import { storeToRefs } from 'pinia'

const store = useStore()
const { name, count } = storeToRefs(store)

const updateState = () => {
  store.setCount()
}
</script>

<template>
  <button @click="updateState">change state</button>
  <div>name: {{ name }}</div>
  <div>count: {{ count }}</div>
</template>

```



#### 4.actions

支持同步和异步



#### 5.getters

```typescript
import { defineStore, StoreDefinition } from 'pinia'

export const useStore: StoreDefinition = defineStore('main', {
  state: () => ({
    name: 'aaa'
  }),
  getters: {
    newName(): string {
      return `new--${ this.name }`
    }
  }
})

export default useStore
```

```vue
<script setup lang="ts">
import { useStore } from './store/store'
import { storeToRefs } from 'pinia'

const store = useStore()
const { name, newName } = storeToRefs(store)

</script>

<template>
  <div>name: {{ name }}</div>
  <div>newName: {{ newName }}</div>
</template>

```



#### 6.API

[官方文档](https://pinia.vuejs.org/api/interfaces/pinia._StoreWithState.html#properties)

##### $reset

重置state到原始状态

```typescript
store.$reset()
```



##### $subscribe

只要状态有变化就会触发。

```typescript
store.$subscribe((args, state) => {
  console.log(args, state)
}, {
  datached: false,	// 如果组件销毁了，是否继续使用。
  deep: false,
  flush: 'post'
})
```



##### $onAction

只要调用了actions就会触发

```typescript
store.$onAction((args) => {
  console.log('onAction', args)
}, false)
```

第二个参数是设置如果组件销毁了，是否继续使用。



##### $dispose

销毁仓库



#### 7.pinia持久化插件

vuex和pinia都有页面刷新后，状态丢失的问题。

【思路】写一个小插件，利用$subscribe，每次有数据变动时，都将最新数据保存到localStorage中，每次第一次加载（相当于刷新）都从localStorage中读取数据，存到pinia中即可。





### 二十四、vue-router

vue2需要用3.x及以下的，vue3需要用4.x以上的版本。



#### 1、基本

**安装**

```shell
npm i vue-router -S
```

**初始化定义**

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

**引入**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```





#### 2、history

在vue2中，就是mode属性；vue3改名为history

