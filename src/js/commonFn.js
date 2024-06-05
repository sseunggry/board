//부모요소 찾기 함수
export const parentNodeFind = (el, className) => {
    while(!(el == null) && !el.classList.contains(className)){
        el = el.parentElement;
    }
    return el;
}

//팝업 오픈
export const popupOpen = (popData) => {
    if(popData === '' || popData == null) return;

    let popupWrap = document.querySelectorAll('.popup-wrap');
    let popup = Object.values(popupWrap).filter((el) => el.dataset.pop === popData);
    popup.map((el) => el.classList.toggle('open'));
}

//팝업 닫기
export const popupClose = (e) => {
    const popupWrap = parentNodeFind(e.target, 'popup-wrap');
    popupWrap.classList.remove('open');
}