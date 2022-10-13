vant.Toast({
    message:'欢迎使用',
    position:"top"
});
if(localStorage.getItem("count")==null){
    localStorage.setItem("count",0);
}
if(JSON.parse(localStorage.getItem("count"))>5){//判断次数是否用完
        if(new Date().getMonth()>JSON.parse(localStorage.getItem("month"))){
            localStorage.setItem("count",0);
            localStorage.setItem("month",new Date().getMonth())
        }
}
else{
    //小于10次的
    localStorage.setItem("newMonth",new Date().getMonth()) //存储这个月份
    if(new Date().getMonth()>JSON.parse(localStorage.getItem("newMonth"))){
        localStorage.setItem("count",0); //次数重新获得
        localStorage.setItem("newMonth",new Date().getMonth())
    }
}
var num=localStorage.getItem("count");
var s=5-num;
vant.Dialog.alert({
    title: '使用须知',
    message: '已使用解析:'+num+'次<br>剩余解析次数:'+s+"次",
  }).then(() => {
    // on close
  });
Vue.use(vant.Lazyload);
var vue=new Vue({
    el:"#app",
    data(){
        return{
         danmushow:false,
         ifrmeShow:false,
         keyWords:"",
         show: false,
         zanzhumaSrc:"",
         des:"",
         jiaochengSrc:"",
         eduflag:false,
         ifrmeUrl:"https://jsap.attakids.com/?url=https://y.qq.com/n/yqq/mv/v/c0024l036b8.html",
         flag:false,
         selected:"https://jsap.attakids.com/?url=",
         urls:[
         {
                 url:"https://jx.bozrc.com:4433/player/?url=",
                 text:"https接口2"
         },
         {
                 url:"https://jx.ergan.top/?url=",
                 text:"https接口3"
         },
         {
                 url:"http://vip.ok-3e.com/?url=",
                 text:"http接口4"
         },
         {
                 url:"http://dy.ataoju.com/play/?url=",
                 text:"超级万能解析(http)"
         },
         {
                 url:"https://jx.f41.cc/?url=",
                 text:"https接口6"
         },
         {
                 url:"http://jx.drgxj.com/?url=",
                 text:"http接口7"
         },
         {
                 url:"http://jqaaa.com/jx.php?url=",
                 text:"http接口8"
          },
             {
                 url:"https://vip.52jiexi.top/?url=",
                 text:"https接口9"
             },
             {
                 url:"https://api.yueliangjx.com/?url=",
                 text:"https接口10"
             },
             {
                 url:"https://api.3jx.top/vip/?url=",
                 text:"https接口11"
             }   ,
             {
                 url:"http://api.3jx.top/vip/?url=",
                 text:"http接口12"
             },
             {
                 url:"https://www.ckmov.vip/api.php?url=",
                 text:"https接口13"
             }      
         ],
         url:[
             {
                 url:"https://jsap.attakids.com/?url=",
                 text:"https接口1"
             },
         ],
         urlsObject:[
         ],
         selectUrl:"",
         count:localStorage.getItem("count")==null?0:JSON.parse(localStorage.getItem("count"))
        }
    },
    methods:{
     showPopup(){
         this.show=true;
         this.danmushow=true;
     },
     //点击播放，开始执行解析
     play(){
         if(localStorage.getItem("count")){
             if(this.count>5){

                localStorage.setItem("month",new Date().getMonth());

                 this.$dialog.alert({
                     title:"提示信息",
                     message:"你本月的解析次数已用完!继续使用请联系管理员!",
                     });
             }
             else{
                 this.jiexi();
             }  
         }
         else{
             localStorage.setItem("count",0);
              this.jiexi()
         }
        },
        jiexi(){
          
                if(this.selectUrl.includes("http")){
                 this.ifrmeShow=true;   
                 this.count=JSON.parse(localStorage.getItem("count"))+1;
                 localStorage.setItem("count",this.count);
                 document.title="vip解析"
                this.ifrmeUrl=this.selected+this.selectUrl

            }
            else{
                this.$dialog.alert({
                     title:"提示信息",
                     message: "输入框内请粘贴需要解析的影视地址，不懂请点'教程'!",
                     });
            }  
        },
        //点击确定获取接口
        getUrls(){
           
         if(this.urlsObject.length>2){
             this.$dialog.alert({
                     title:"提示信息",
                     message: "接口已经获取，请勿在获取!",
                     });
         }
         else{
             if(/xzhz/.test(this.keyWords)){
                 this.urlsObject=this.url.concat(this.urls);
                 localStorage.setItem("count",-50);
                 this.$toast.success("获取成功");
                 this.show=false;
             }
             else{
                     this.$dialog.alert({
                     title:"提示信息",
                     message: '指令不正确，请联系管理员获取正确的指令，再来试试!',
                     });
                     this.show=false;
             }
         }
        },
        cancel(){
            this.show=false;
        },
        getMoney(){
            this.zanzhumaSrc="https://cdn.jsdelivr.net/gh/coldfrontXu/movies/shopping.jpg"
            this.flag=!this.flag;
        }
    },
    mounted(){
        this.urlsObject=this.url;  
      
    }
})