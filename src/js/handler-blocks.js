const blocks = document.querySelectorAll('.block');

function blocksHandler(arr) {
  blocks.forEach((el) => {el.style.opacity = 0;});
  for (let i = 0; i < arr.length; i++) {
    const element = document.querySelector(`.${arr[i]}`);
    element.style.transition = '2s';
    element.style.opacity = 1;
  }
}

export {blocksHandler};
