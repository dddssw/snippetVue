import { highlightCode, consoleInfo } from "../utils/printCode";
export const infoData = {
  tableexpose: async () => {
    const list = [
      "getSelectionRows 用于多选表格，返回当前选中的行数据,也可以监听select-change进行赋值",
      "toggleRowSelection 用于多选表格，切换某一行的选中状态，第一个参数是行数据（row），如果使用了第二个参数，则可直接设置这一行选中与否",
      "clearSelection 用于多选表格，清空用户的选择",
    ];
    consoleInfo(list, "el-table expose");
  },
  validTable: async () => {
    const list = [
      "table的源数据作为form :model绑定的一个属性",
      "在需要校验的组件外包裹el-form-item组件",
      `<el-form-item :prop="'tableData.' + index + '.name'" :rules="rules.name">`,
      `这里校验的是:model绑定数据下.tableData[index].name,所以组件也绑定这个值即可`,
      `<el-input v-model="row.name">`,
    ];
    consoleInfo(list, "el-form校验el-table");
  },
  debounce: () => {
    const codeSnippet = `
function debounce(func, duration) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(()=>{func.apply(this, args)}, duration);
  };
}
`;
    highlightCode(codeSnippet);
  },
  throttle: () => {
    const codeSnippet = `
function throttle(func, duration) {
  let wait = false;

  return function (...args) {
    if(!wait){
      wait = true
      func.apply(this,args)
      setTimeout(()=>{wait = false},duration)
    }
  };
}
`;
    highlightCode(codeSnippet);
  },
  难点: () => {
    const list = [
      "ui有一个要求,希望我们的搜索结果里把搜索词高亮显示.",
      "开始我们找到一个支持vue3的包来进行高亮显示,但是对于组件库里的组件实现高亮这个包就无能为力了,为此不得不使用原生dom设置innerhtml",
      "这样一来场景不同,实现高亮的方法也不同,而且原生操作很麻烦,第三方库使用起来也有点麻烦.",
      "所以为了统一高亮的实现方案,我花了一些时间研究,发现web api有相关的高亮方法.",
      "在项目中实验可行,因为我们有三个项目都需要统一规范,所以使用 Webpack 打包成一个 npm 包，方便团队共享，并且未来在其他项目中也能复用",
    ];
    const list1 = [
      "前后端联调时间短:之前我们的联调时间比较充裕,这个问题没有暴露出来.",
      "但是这个项目开始是跨科室协作的,而且前期工作量大.导致排期的时候联调时间是被大大压缩的",
      "我们前端主要就是拿到后端给的数据渲染页面,先让我们的页面展示出来,也方便我们完善ui.",
      "所以我就想到了mock数据,接口定好协议我们前端的工作就可以很顺利的展开了",
      "选型上可以使用第三方平台或者我们的文档就是用yapi,它也支持mock数据的功能",
    ];
    const list2 = [
      "大文件上传",
      "通过上传组件我们可以拿到一个file文件,它继承blob,blob提供了一个slice方法,使用这个方法将大文件切片",
      "接下来为文件生成hash,为了防止阻塞,放在了web worker里执行,使用spark-md5以增量方式生成hash",
      "将hash和文件",
    ];
    const list3 = [
      "发现有一些可以公用的方法每个人都单独实现了，造成了项目体积无意义的膨胀。分析了几个原因",
      "其他人压根不知道已经有实现这个功能的方法",
      "有学习成本，需要看别人的代码了解怎么实现",
      "因此需要通用集中管理hook和utils，最好直接展示在vscode侧边栏里，所以想到开发一个插件",
      "首先需要拿到一个文件导出的内容，开始想直接使用import，webpack打包忽略这个import语句，并且使用tsc编译ts文件，但是实际上是不支持",
      "也考虑使用正则，但是太过繁琐，因为导出语法有几种。而且不是很踏实",
      "最后发现使用babel解析出ast，然后在分析这个树，可以获得导出的内容",
      "然后根据获取到的数据在插件中递归渲染一个树视图，得益于ast额外提供的注释节点，位置信息",
      "鼠标悬浮即可显示注释，点击可以跳转文件并自动滚动到导出内容并高亮,点击操作按钮在当前活跃文件上自动导入",
    ];
    const list4 = [
      "解决路由表路由子信息meta数据冗余问题，有的时候新增一个路由，只是从别的位置简单的复制粘贴",
      "导致meta出现一些无意义的数据，而且了解这些meta属性是需要一定时间的",
      "从更长远的角度来看,如果一段时间转向react,在转回vue,vuerouter里这些路由配置是否还记得是什么意思呢",
      "在此基础上，创建完路由还需要创建页面",
      "所以使用脚手架来解决这个问题，基本思路是解析路由表，选择节点位置插入新路由，配置路由表，里面会有相关属性的描述。",
      "自动更新路由表，选择模板文件并生成，生成文件是抽离注册成另一个命令",
    ];
    const list5 = [
      //  "还有一个问题当使用组件库时,需要查找对应组件文档,这就造成了工作流上下文频繁切换的问题,而有时我们只是需要简单的模版",
      //  "我的思路是使用脚手架生成组件模版,里面配置一些常见的属性,当然不仅仅是模版,还有响应式数据,函数的,",
      //  "配合vscode插件将这些部分分别插入template,script.这也解决了vue文件需要滚动在固定区块写代码",
      //  "比较复杂的是el-form,因为elformitem里需要包含其他组件,所以注册组件应该是可复用的."
      "开发过程中发现经常要用组件库的组件,然后去对应的组件文档里复制粘贴过来,而且可能分别需要添加在template和script中",
      "而且还有一些自定义的情况,例如有一个指令禁止输入全角字符,但是我又不记得是怎么写的,我想要用的时候不得不去其他地方找",
      "如果我能通过一些交互生成模版,响应式数据声明,函数.再利用vscode插件提供的接口在当前活跃文件内全部注入",
      "并且需要考虑复用性,可扩展性,使用策略模式避免大量的ifelse,例如怎么生成el-form,因为el-form-item下可以复用生成其他组件的逻辑",
      "对于组件属性配置,我给出了常用的配置,以及自定义的属性例如指令,并添加描述,对于值是非string需要在属性前加上v-bind的简写",
      "除此之外,我还使用了chalk让整个交互具备层次感.",
    ];
  },
  虚拟列表: () => {
    const list = [
      "首先确定一下html结构,最外面 div 就是设定高度的窗口，内部一层的 div 需要计算出总高度，再内部一层的 div 通过 translateY XX 移动到合适的位置",
      "初始时计算总高度和页面展示的子项个数,需要加上缓冲区",
      "滚动过程中计算开始节点(需要减去上缓冲区)和需要展示的子项",
      "对于不定高的,开始需要计算出高度数组和需要展示的子项个数,滚动过程中二分查找计算开始节点,并计算应该展示多少个子节点需要加上缓冲区",
    ];
  },
  "vue2/vue3": () => {
    const list = [
      "重构了响应式系统，性能优化，和Api的改进",
      "vue3使用了基于proxy的响应式系统，支持深度响应式和动态属性的监听",
      "引入了Composition api,使逻辑复用更加方便",
      "新增了fragment，teleport,suspense这样的内置组件",
      "使用ts进行重写，在idea中的代码提示效果更好",
      "在性能方面，优化了模板编译和diff算法，并且支持树摇，打包体积进一步缩小",
    ];
    consoleInfo(list, "vue3与vue2的不同");
  },
  "watch/watcheffect": () => {
    const list = [
      "都是用来监听响应式数据的变化，但使用场景不同",
      "watch需要显式指定依赖对象，监听多个数据需要用数组，并能提供新值和旧值",
      "watcheffect能自动收集所有依赖",
      "watch可以配置flush，deep,immediated,watcheffect只有flush，没有deep,immediated相当于是true",
      "如果只需要监听一个对象中的几个属性，使用watcheffect更好，因为它将只跟踪回调中使用到的属性，而不是递归的跟踪所有属性",
    ];
    consoleInfo(list, "watch watcheffect的区别");
  },
  "ref/reactive": () => {
    const list = [
      "都是用来创建响应式数据，但是使用场景有些不同",
      "reactive只能用于复杂数据类型，而ref更为通用，但是使用需要多写一个.value。",
      "并且需要注意ref有自动解包策略",
      "watch对ref reactive数据监听不同，如果是reactive，修改它的任何属性都会触发",
      "对应ref，默认情况下只会对.value的重新分配做出反应，但是可以使用deep让他监听所有的嵌套属性",
      "https://github.com/orgs/vuejs/discussions/9428(playground中有bug未解决)",
    ];
    consoleInfo(list, "ref reactive");
  },
  "watch/computed": () => {
    const list = [
      "watch是监听动作，computed是计算属性",
      "watch没缓存，只要监听的数据变化就执行。computed有缓存，只有响应式数据改变才会重新计算",
      "watch可以执行异步操作，computed不行",
      "watch常用于一个数据影响多个数据，而computer常用于多个数据影响一个数据",
    ];
    consoleInfo(list, "watch/computed 的区别");
  },
  "defineProperty/proxy": () => {
    const list = [
      "使用defineProperty是因为当时proxy兼容性不好",
      "defineProperty只能劫持对象属性的getter和setter，并且无法监听会修改原数组的数组方法，所以对这些方法就行重写",
      "proxy能直接劫持整个对象",
      "可以直接监听对象，数组的变化，并且拦截类型多达13种",
    ];
    consoleInfo(list, "defineProperty/proxy 的区别");
  },
  data: () => {
    const list = [
      "data是一个组件的状态，如果他是一个对象",
      "这个组件被多次引用，那么data将指向同一个地址，但是我们不需要状态共享",
      "所以通过函数返回一个新对象，把状态隔离",
    ];
    consoleInfo(list, "为什么data是一个函数");
  },
  cli: () => {
    const list = [
      "为了降低在项目寻找最佳实践的成本，用于代码生成和自动化,遵循了模块化，便于扩展的原则",
      "例如为input写了一个指令，于是我不得不前往其他文件里查找复制粘贴进来",
    ];
    consoleInfo(list, "背景");
    const list1 = [
      "新增模块需要在路由表进行注册然后新建文件，通过脚手架命令把这个步骤自动化",
      "首先使用babel/parse路由表进行分析，解析出它的层级关系，在通过inquery的交互功能选择在哪个节点上进行新增",
      "确定完位置后对路由表信息进行配置，根据bable/types生成ast节点，将新的ast解析成js代码。这样路由表也就自动更新了",
      "配置之后会询问是否生成模板代码，查找模板自动生成文件",
    ];
    consoleInfo(list1, "难点");
    const list2 = [
      "生成element组件模板代码，但是form表单比较特殊。因为el-form-item会包含其他组件",
      "所以我需要开启另一个进程，并与主进程共享输入输出，但是这样父子进程之间无法通信",
      "想了一些办法来解决，我导出一个对象，在子进程修改对象的键值，等待子进程执行完。再在主进程读取这个对象。",
      "但是发现拿到的对象还是初始值。所以换了一种方式，把对象换成了直接输出文件，在进行读取。这样就可以拿到了",
    ];
    consoleInfo(list2, "难点");
  },
  优化: () => {
    const list = [
      "图片使用webp格式，进行图片/组件的懒加载,将第三方库上传到cdn",
      "通过树摇删除无用代码，使用gzip压缩，合理控制打包文件大小，充分利用浏览器缓存策略",
      "将长任务移动到web worker，防止阻塞页面",
      "防抖和节流，避免内存泄露",
      "使用虚拟列表，大文件上传技术",
    ];
    consoleInfo(list, "性能优化");
  },
  scoped: () => {
    const list = [
      "scoped会为组件生成唯一标识，并在dom上添加这个属性，选择器也会在末尾加上这个属性选择器",
      "使用scoped无法修改第三方组件库的样式，因为最后选择器会加上这个属性，但是使用样式穿透可以实现修改样式",
      "本质是用了样式穿透后，在deep之后的选择器最后就不会加上这个属性",
      "或者新增一个不带scoped的style，但要注意不要产生全局污染",
    ];
    consoleInfo(list, "scoped");
  },
  动态规划: () => {
    const list = [
      "dp[i]代表什么:前i个的结果或者是以第i个结束的结果",
      "需要注意如果有n个数据,要加上0的情况所以需要拿到dp[n],注意下标,不要取错了值",
      "对于最简单的动态规划，尽可能补全初始值，直到判断不了，复杂的可能需要两个for循环",
    ];
  },
  "0/1背包": () => {
    const list = [
      "都需要两层for循环,一层循环物品,一层循环背包(从0开始)",
      "二维:dp[i][j]代表从从第0~i个物品中选满足重量j的最大价值",
      "dp[i][j]=Math.max(dp[i-1][j],d[[i-1][j-weight[i]]+value[i]])",
      "一维:dp[j]代表从容量为j的最大价值,为什么能用一维,可以看上当前层只依赖上一层,dp[i]=Math.max(dp[i],dp[i-weight[i]]+value[i]",
      "循环背包时逆序,因为只跟上方和左上方的数据有关,这个时候不能提前更新它",
    ];
    consoleInfo(list, "0/1背包");
    const codeSnippet = ` let dp=new Array(target+1).fill(false)
    dp[0]=true
    for(let i=0;i<nums.length;i++){
      for(let j=target;j>=nums[i];j--){
        dp[j]=dp[j]||dp[j-nums[i]]
      }
    }
    return dp[target]`;
    highlightCode(codeSnippet);
  },
  完全背包: () => {
    const list = [
      "初始化bp数组，长度是背包value+1,设置初始值",
      "let dp = new Array(amount + 1).fill(Infinity)",
      "dp[0] = 0;",
      "两层for循环，外层循环背包，i从1开始，取值要注意减一，内层循环物品，满足条件，进行判断dp[i]=dp[i]||dp[i-cur.length]",
      "注意i，j不要用混了，length不要拼写错误",
    ];
    consoleInfo(list, "完全背包");
    const codeSnippet = `var wordBreak = function(s, wordDict) {
    let dp=new Array(s.length+1).fill(false)
    dp[0]=true
    for(let i=1;i<=s.length;i++){
       for(let j=0;j<wordDict.length;j++){
        let cur = wordDict[j]
        if(i-cur.length>=0&&s.slice(i-cur.length,i)===cur){
            dp[i]=dp[i]||dp[i-cur.length]
        }
       }
    }
    return dp[s.length]
};`;
    highlightCode(codeSnippet);
  },
  js基本数据类型有哪些及它们的区别: () => {
    const list = [
      "js有八种数据类型,分别是null,undefined,number,string,boolean,object,symbol,bigint",
      "symbol和bigint是es6新增的,symbol是为了创建一个独一无二的数据,解决可能出现的全局变量冲突的问题",
      "js的number类型是基于IEEE754标准,最大可以表示的数是2^53-1,超过这个范围精度会丢失,bigint能表示任意大小的数,不会出现精度丢失",
      "这些数据可以分为原始数据类型和引用数据类型",
      "两种类型的区别在于存储位置的不同,原始数据类型放在栈中,引用数据类型放在堆中.但是在栈中会存放指向堆的指针",
    ];
  },
  数据类型检测的方式有哪些: () => {
    const list = [
      "typeof",
      "typeof null 的结果为 object,这是官方承认的 typeof 的错误，这个问题来自于 JavaScript 语言的早期阶段，并为了兼容性而保留了下来。null 绝对不是一个 object。null 有自己的类型，它是一个特殊值。typeof 的行为在这里是错误的。",
      "typeof alert 按理应该是返回 object。但是 typeof 会对函数区分对待，并返回 function。这也是来自于 JavaScript 语言早期的问题。从技术上讲，这种行为是不正确的，但在实际编程中却非常方便。",
      "instanceof,其内部运行机制是判断在其原型链中能否找到该类型的原型,只能正确判断引用数据类型，而不能判断基本数据类型",
    ];
  },
  this: () => {
    const list = [
      "指向当前执行上下文中的 执行环境 或 函数调用的上下文",
      "箭头函数的写法更简洁,箭头函数没有this,继承与外部词法环境,不能被修改,没有arguments,不能成为构造函数",
    ];
  },
  原型: () => {
    const list = [
      "对象有一个特殊的隐藏属性prototype,它要么为null,要么就是另一个对象的引用,该对象被称为原型",
      "属性 [[Prototype]] 是内部的而且是隐藏的,但是使用特殊的名字 __proto__ 可以设置它",
      "当访问一个对象的属性,如果没找到就会到原型里找,原型里又有它的原型,这样一直寻找,就是一条原型链,原型链的终点是null",
    ];
  },
  闭包: () => {
    const list = [
      "闭包 是指一个函数可以记住其外部变量并可以访问这些变量",
      "例如防抖节流函数",
      "注意内存泄漏",
    ];
  },
  内存泄漏: () => {
    const list = ["意外的全局变量", "闭包", "定时器", "没有清理的dom引用"];
  },
  "var,let,const": () => {
    const list = [
      "let const 有块级作用域,var没有",
      "var允许重复声明",
      "使用var声明的全局函数和变量会成为全局对象的属性",
      "var声明会被提升,,但是赋值不会,let const有暂时性死区",
      "const必须设置初始值,const声明之后不能重新赋值",
    ];
  },
  new: () => {
    const list = [
      "创建一个空对象分配给this",
      "执行函数体,通常会修改this",
      "返回this",
    ];
  },
  es6: () => {
    const list = [
      "let const",
      "箭头函数",
      "解构赋值",
      "模版字符串",
      "promise",
      "扩展运算符",
    ];
  },
  promise: () => {
    const codeSnippet = `//ajax改造成promise
      function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    // 设置请求成功的回调
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText); // 请求成功，返回响应内容
      } else {
        reject(new Error()); // 请求失败
      }
    };

    // 设置请求失败的回调
    xhr.onerror = function() {
      reject(new Error('Network error')); // 网络错误
    };

    // 发送请求
    xhr.send();
  });
}

// 使用 Promise 的方式进行调用
ajax('https://api.example.com/data')
  .then(response => {
    console.log('Success:', response);
  })
  .catch(error => {
    console.log('Error:', error);
  });
`;
    highlightCode(codeSnippet);
  },
  "null/undefined": () => {
    const list = [
      "基本是同义的,只有一些细微的差别,null表示此处不应该有值,undefined表示此处应该有一个值,只是没有定义",
      "所以访问一个不存在的对象属性返回是undefined",
      "在双等检查中返回true,除此之外,它们在双等检查中不会进行隐式转换",
    ];
    consoleInfo(list, "null undefined的区别");
  },
  key: () => {
    const list = [
      "key作为vue的diff算法提示,在比较新旧节点列表时用于识别vnode",
      "",
      "",
    ];
  },
  "ref/reactive实现原理区别": () => {
    const list = ["", "", ""];
  },
  "get/post": () => {
    const list = [
      "get请求的请求参数会放在url之后，参数之间使用&符号连接。post则是放在请求体里",
      "并且浏览器对url的长度是有限制的",
      "post因为请求参数放在请全体里相对安全一点",
      "get会被缓存，post不会，除非响应头包含适当的cache-control或expires",
      "get产生一个tcp数据包，post产生两个tcp数据包",
      "--------------------------------------",
      "在发生跨域并且不是一个简单请求时，http会发送一个预检请求，用于检查服务器是否支持cors协议，并且是否允许使用特定的方法或标头",
    ];
    consoleInfo(list, "get/post的区别");
  },
};
