

export default function () {
    // window.onload = () => {
        /**
         * 获取元素, 设立count计数器，来节约性能, 计算锚点
         */ 
        // 小篇幅blog的入场动画
        let count1 = 1, smallBlogsWrapper = document.querySelectorAll(".blogs-without-cover-img")[0];
        let smallBlogsWrapperEndToTop = smallBlogsWrapper.clientHeight + smallBlogsWrapper.offsetTop
        // 个人简历的固定不动
        const navHeight = document.querySelector("#mynav").clientHeight
        const resumeContainer = document.querySelector(".resume-wrapper")
    
        
    
        

        // 建立监听函数
        window.onscroll = function () {
            const a = document.documentElement.scrollTop || document.body.scrollTop; //滚动条y轴上的距离
            const b = document.documentElement.clientHeight || document.body.clientHeight; //可视区域的高度
            const c = document.documentElement.scrollHeight || document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）
            
            /**
             * 判断
             */
            // 小blog入场
            if ( a + b > smallBlogsWrapperEndToTop + 200 && count1 -- > 0) {
                smallBlogsWrapperEntrance(smallBlogsWrapper)
            }
            // 个人简历
            if(a >= navHeight){ 
                resumeContainer.style.marginTop = `${a  - navHeight}px`
            }else{
                resumeContainer.style.marginTop = `0px`
            }
        };
    // }


}


/**
 * 动作函数
 */
function smallBlogsWrapperEntrance() {
    // 获取操作元素
    const elements = document.querySelectorAll(".animate1");

    elements.forEach(ele => {
        ele.classList.remove('hide')
        ele.classList.add("fadeInRight")
    })
}