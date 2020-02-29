

export default function () {
    // 建立监听函数
    window.onscroll = function () {
        const a = document.documentElement.scrollTop || document.body.scrollTop; //滚动条y轴上的距离
        const b = document.documentElement.clientHeight || document.body.clientHeight; //可视区域的高度
        const c = document.documentElement.scrollHeight || document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）

        // 小篇幅blog的入场动画
        let smallBlogsWrapper = document.querySelectorAll(".blogs-without-cover-img")[0];
        // 个人简历的固定不动
        const navHeight = document.querySelector("#mynav").clientHeight
        const resumeContainer = document.querySelector(".resume-wrapper")
        // 相册动态背景 & 字体飞出效果
        const albumShowContainer = document.querySelector(".albums-introduction-wrapper")
        const albumShowBg = document.querySelector(".album-introduction-bg")

        // 分类飞出效果
        const mainCategroy = document.querySelector(".main-album-wrapper")

        // 留言板飞出功能
        const messagePad = document.querySelector(".message-pad-wrapper")
        /**
         * 判断
         */
        // 小blog入场
        if (!smallBlogsWrapper) return
        let smallBlogsWrapperMiddleToTop = smallBlogsWrapper.clientHeight / 2 + smallBlogsWrapper.offsetTop

        if (a + b > smallBlogsWrapperMiddleToTop) {
            smallBlogsWrapperEntrance(smallBlogsWrapper)
        }
        // 个人简历
        if (!albumShowContainer) return
        let albumShowContainerTopToTop = albumShowContainer.offsetTop
        if (a + b > albumShowContainerTopToTop) {
            resumeContainer.style.marginTop = `${albumShowContainerTopToTop - navHeight - b}px`
        }
        else if (a >= navHeight) {
            resumeContainer.style.marginTop = `${a - navHeight}px`
        } else {
            resumeContainer.style.marginTop = `0px`
        }

        // album背景不动
        if (!albumShowBg || !albumShowContainer) return
        const byondHeight = albumShowBg.clientHeight - albumShowContainer.clientHeight
        const albumShowContainerEndToTop = albumShowContainer.clientHeight + albumShowContainer.offsetTop
        if (a + b >= albumShowContainer.offsetTop && a <= albumShowContainerEndToTop) {
            let albumShowContainerHeight = albumShowContainer.clientHeight
            let moveHeight = byondHeight * (b - albumShowContainer.offsetTop + a) / (b + albumShowContainerHeight)
            albumShowBg.style.top = `${moveHeight - byondHeight}px`
        }

        // 自我介绍字体飞出效果
        const albumShowContainerMiddleToTop = albumShowContainer.clientHeight / 2 + albumShowContainer.offsetTop
        if (a + b >= albumShowContainerMiddleToTop) {
            selfIntroductionEntrance()
        }

        // 分类飞出效果
        const mainCategroyMiddleToTop = mainCategroy.clientHeight / 2 + mainCategroy.offsetTop
        if (a + b >= mainCategroyMiddleToTop) {
            categoriesEntrance()
        }

        // 留言板飞出
        const messagePadMiddleToTop = messagePad.clientHeight / 2 + messagePad.offsetTop
        if (a + b >= messagePadMiddleToTop) {
            messagePadEntrance()
        }
    };
}


/**
 * 动作函数
 */
function smallBlogsWrapperEntrance() {
    // 获取操作元素
    const elements = document.querySelectorAll(".animate1");

    elements.forEach(ele => {
        ele.classList.remove('hide')
        ele.classList.add("fadeInLeft")
    })
}

function selfIntroductionEntrance() {
    // 获取dom元素
    const elements = document.querySelectorAll(".animate2")
    elements.forEach((ele, index) => {
        ele.classList.remove('hide')
        ele.classList.add("fadeInRight", "animated")
        ele.style.animationDelay = `${index * 0.15}s`
    })
}

function categoriesEntrance() {
    const elements1 = document.querySelectorAll(".animate3")
    const elements2 = document.querySelectorAll(".animate4")
    elements1.forEach((ele, index) => {
        ele.classList.remove('hide')
        ele.classList.add("fadeInLeft", "animated")
        ele.style.animationDelay = `${index * 0.15}s`
    })
    elements2.forEach(ele => {
        ele.classList.remove('hide')
        ele.classList.add("fadeInRight", "animated")
    })
}

function messagePadEntrance() {
    const elements1 = document.querySelectorAll(".animate6")
    elements1.forEach((ele, index) => {
        ele.classList.remove('hide')
        ele.classList.add("fadeInRight", "animated")
        ele.style.animationDelay = `${index * 0.5}s`
    })
}