export default class Tank {
  constructor(x, y, width, height, bulletController, mapController) {
    this.x = x;
    this.y = y;
    this.previousX = null;
    this.previousY = null;
    this.width = width;
    this.height = height;
    this.widthOriginal = width;
    this.heightOriginal = height;
    this.speed = 2;
    this.forwardPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
    this.reversePressed = false;
    this.shootPressed = false;
    this.bulletController = bulletController;
    this.bulletSpeed = 3;
    this.bulletDelay = 10;
    this.bulletDamage = 1;
    this.direction = 'forward';
    this.mapController = mapController;

    document.addEventListener('keydown', this.keydown)
    document.addEventListener('keyup', this.keyup)
  }

  draw(ctx) {
    this.getPreviousXAndY();
    this.move();

    // tank body
    ctx.beginPath();
    ctx.rect(
      this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      const bulletX = this.x + (this.width / 5 * 2);
      const bulletY = this.y + this.height / 2;
      this.bulletController.shoot(bulletX, bulletY, this.bulletSpeed, this.bulletDamage, this.bulletDelay, this.direction)
    }
  }

  getPreviousXAndY() {
    this.previousX = this.x;
    this.previousY = this.y;
  }

  move() {
    const positionOutTop = this.y <= 0 - this.height;
    const positionOutBottom = this.y >= this.mapController.canvasWidth;
    const positionOutLeft = this.x <= 0 - this.width;
    const positionOutRight = this.x >= this.mapController.canvasWidth;
    const moveToBottom = this.mapController.canvasHeight + this.height
    const moveToTop = 0 - this.height
    const moveToLeft = 0 - this.width
    const moveToRight = this.mapController.canvasWidth

    if (this.forwardPressed) {
      positionOutTop ? this.y = moveToBottom : this.y -= this.speed
    };
    if (this.reversePressed) {
      positionOutBottom ? this.y = moveToTop : this.y += this.speed
    };
    if (this.leftPressed) {
      positionOutLeft ? this.x = moveToRight : this.x -= this.speed
    };
    if (this.rightPressed) {
      positionOutRight ? this.x = moveToLeft : this.x += this.speed
    };

    switch (this.direction) {
      case 'forward':
        this.width = this.widthOriginal;
        this.height = this.heightOriginal;
        break;
      case 'reverse':
        this.width = this.widthOriginal;
        this.height = this.heightOriginal;
        break;
      case 'left':
        this.width = this.heightOriginal;
        this.height = this.widthOriginal;
        break;
      case 'right':
        this.width = this.heightOriginal;
        this.height = this.widthOriginal;
        break;
    }
  }

  keydown = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        this.direction = 'left'
        this.leftPressed = true;
        this.rightPressed = false;
        this.forwardPressed = false;
        this.reversePressed = false;
        break;
      case "ArrowRight":
        this.direction = 'right'
        this.leftPressed = false;
        this.rightPressed = true;
        this.forwardPressed = false;
        this.reversePressed = false;
        break;
      case "ArrowUp":
        this.direction = 'forward'
        this.leftPressed = false;
        this.rightPressed = false;
        this.forwardPressed = true;
        this.reversePressed = false;
        break;
      case "ArrowDown":
        this.direction = 'reverse'
        this.leftPressed = false;
        this.rightPressed = false;
        this.forwardPressed = false;
        this.reversePressed = true;
        break;
      case "Space":
        this.shootPressed = true;
        break;
    }

  }

  keyup = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        this.leftPressed = false;
        break;
      case "ArrowRight":
        this.rightPressed = false;
        break;
      case "ArrowUp":
        this.forwardPressed = false;
        break;
      case "ArrowDown":
        this.reversePressed = false;
        break;
      case "Space":
        this.shootPressed = false;
        break;
    }
  }
}