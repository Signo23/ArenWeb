export class ElementInfo{
    x: number = 0;
    y: number = 0;
    width: number = 1;
    height: number = 1;
    visible?: boolean;
}

export class ElementInfos{
    public static interacts(element1: ElementInfo, element2: ElementInfo): boolean{
        return ((element2.x >= element1.x && element2.x <= element1.x + element1.width) ||
            (element2.x + element2.width >= element1.x && element2.x + element2.width <= element1.x + element1.width)) &&
            ((element2.y >= element1.y && element2.y <= element1.y + element1.height) ||
            (element2.y + element2.height >= element1.y && element2.y * + element2.height <= element1.y + element1.height));
    }
}
