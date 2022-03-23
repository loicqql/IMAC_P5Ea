interface CursorPos {
    x: number,
    y: number,
};

class Cursor {
    x:number
    y:number
    tab: Array<CursorPos>;
    
    constructor() {
        this.tab = new Array();
        this.x = -100;
        this.y = -100;
    }

    render(white:boolean) {

        fill(white ? 0 : 255);
        stroke(white ? 255 : 0);
        strokeWeight(white ? 4 : 2);

        let size;

        for (let i = this.tab.length - 1; i >= 0; i--) {
            const el = this.tab[i];
            size =  i / (this.tab.length-1) * 25;
            square((el.x - size / 2), (el.y - size / 2), size, 2);
        }
    }

    step() {

        this.tab.splice(0, 0, { 'x': mouseX - width / 2, 'y': mouseY - height / 2});

        if (this.tab.length > 10) {
            this.tab.pop();
        }
    }

}