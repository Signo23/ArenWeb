export class ElementInfo{
    x: number;
    y: number;
    private width: number;
    private height: number;
    visible?: boolean;

    constructor(x?: number, y?: number, visible?: boolean) {
      this.x = x == null ? 0 : x;
      this.y = y == null ? 0 : y;
      this.visible = visible != null && visible;
      this.width = window.innerWidth * 0.0625;
      this.height = window.innerHeight * 0.0833;
      console.log(this, window);
    }
    public getWidth(): number{
      this.width = window.innerWidth * 0.0625;
      return this.width;
    }

    public getHeight(): number{
      this.height = window.innerHeight * 0.0833;
      return this.height;
    }
    public interacts(element: ElementInfo): boolean{
      return (
        this.between(element.x, this.x, this.x + this.getWidth()) ||
        this.between(element.x + element.getWidth(), this.x, this.x + this.getWidth())
      ) && (
        this.between(element.y, this.y, this.y + this.getHeight()) ||
        this.between(element.y + element.getHeight(), this.y, this.y + this.getHeight())
      );
    }

    private between(n: number, greaterThan: number, lowerThan: number){
      return n >= greaterThan && n <= lowerThan;
    }
}
