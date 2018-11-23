export default (targetEle) => {
  return document.documentElement.clientHeight - targetEle.getBoundingClientRect().top;
}
