class Img {
  offCtx;

  image;
  srcSet;
  srcIdx;

  nxtImg;
  isChanging;

  ratio;
  width;
  height;

  pixels;

  constructor(offCtx, width, srcSet) {
    this.offCtx = offCtx;
    this.srcSet = srcSet;
    this.srcIdx = -1;
    this.isChanging = false;

    const image = new Image();

    this.ratio = 1.414; 
    this.image = image;
    this.width = width;

    image.src = this.srcSet[0];
  }

  setOnload(onload) {
    this.image.onload = () => {
      const height = Math.floor(this.width * this.ratio);
      this.height = height;

      this.offCtx.clearRect(0, 0, this.offCtx.canvas.width, this.offCtx.canvas.height);
      this.offCtx.drawImage(this.image, 0, 0, this.width, height);
      this.pixels = this.offCtx.getImageData(0, 0, this.width, height).data;
      onload();
    }
  }

  changeImg(idx) {
    this.isChanging = true;
    this.srcIdx = (this.srcIdx + 1) >= this.srcSet.length ? 0 : this.srcIdx + 1;

    this.nxtImg = new Image();
    this.nxtImg.src = this.srcSet[idx];

    this.nxtImg.onload = () => {
      this.offCtx.clearRect(0, 0, this.offCtx.canvas.width, this.offCtx.canvas.height);
      this.offCtx.drawImage(this.nxtImg, 0, 0, this.width, this.height);
      
      this.pixels = this.offCtx.getImageData(0, 0, this.width, this.height).data;
    }
  }
}

export default Img;