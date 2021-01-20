let navbar = document.querySelector('.navbar-nav');
let mainList = navbar.children;
let moreDropdown = document.querySelector('.nav-item.dropdown');
let moreList = document.querySelector('.dropdown-menu ul');

function unshiftToMore () {
    let item = mainList[mainList.length - 2];
    if (item) {
        item.dataset['width'] = item.clientWidth;
        moreList.prepend(item);
    }

    if (moreDropdown.classList.contains('hidden')) {
        moreDropdown.classList.remove('hidden');
    }
}

function pushToMain (sumWidth) {
    if (!moreList.children.length) {
        moreDropdown.classList.add('hidden');
    }
    let item = moreList.children[0];
    if (!item) {
        return
    }

    if ((sumWidth + parseFloat(item.dataset.width)) < navbar.clientWidth || window.innerWidth <= 991) {
        mainList[mainList.length - 1].before(item);
    }
}

function start () {
    if (window.innerWidth <= 991) {
        [...moreList.children].forEach(() => pushToMain(0))
        moreDropdown.classList.add('hidden')
        return
    }
    let itemsArr = [...mainList];
    let sumWidth = 0;

    itemsArr.forEach(item => {
        sumWidth += item.clientWidth;
    })

    if (sumWidth >= navbar.clientWidth && mainList.length) {
        unshiftToMore();
        start()
    } else {
        pushToMain(sumWidth);
    }
}

window.addEventListener('load', function () {
    start();
})

window.addEventListener("resize", function () {
    start();
})
