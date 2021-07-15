function TimeLine(element) {
  this.element = element;
  this.postion = 0;         // 当前位置
  this.startPosition = 0;   // 初始位置
  this.cachePosition = 0;   // 缓存位置
  this.offset = 0;

  this.setPosition = num => this.postion = num;
  this.setStartPosition = num => this.startPosition = num;
  this.setCachePosition = num => this.cachePosition = num;
  this.setOffset = num => this.offset = num;
  // 用户开始拖动元素时触发
  this.element.ondragstart = (e) => {
    console.log('用户开始拖动元素时触发');
    // if (this.startPosition === 0) {
    this.setStartPosition(e.clientX);

    // }

  };
  // 元素正在拖动时触发
  this.element.ondrag = (e) => {
    this.setPosition(e.clientX - this.startPosition + this.offset);
    this.moveElement();
  };
  // 用户完成元素拖动后触发
  this.element.ondragend = (e) => {
    console.log('用户完成元素拖动后触发');
    this.setPosition(e.clientX - this.startPosition + this.offset);
    this.setOffset(e.clientX - this.startPosition + this.offset);
    // this.setStartPosition(this.postion + this.offset);
    this.moveElement();
    this.rebound();
    console.log(this);
  };

  // 当被鼠标拖动的对象进入其容器范围内时触发此事件
  this.element.ondragenter = () => {
    console.log('当被鼠标拖动的对象进入其容器范围内时触发此事件');

  };

  // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
  this.element.ondragover = () => {
  };

  // 当被鼠标拖动的对象离开其容器范围内时触发此事件
  this.element.ondragleave = () => {
    console.log('当被鼠标拖动的对象离开其容器范围内时触发此事件');

  };

  // 在一个拖动过程中，释放鼠标键时触发此事件
  this.element.ondrop = () => {
    console.log('在一个拖动过程中，释放鼠标键时触发此事件');

  };


  // 移动节点
  this.moveElement = (status) => {
    if (this.cachePosition === this.postion) {
      return;
    }
    this.setCachePosition(this.postion);

    if (status ==='rebound'){
      $(this.element).animate({left:this.postion},200)

    }else{
      this.element.style.left = `${this.postion}px`;

    }
  };

  // 回弹
  this.rebound = () => {

    let num = this.postion / 100;
    console.log(num.toFixed());



    this.setPosition(num.toFixed() * 100);

    this.moveElement('rebound');

  };
}

let timeLine = new TimeLine(document.querySelector('.content'));

