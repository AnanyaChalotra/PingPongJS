const INIT_VELOCITY = 1;
const VELOCTIY_INCREASE = 0.00001;
export default class Paddle {

    constructor(PaddleElem)
    {
        this.PaddleElem = PaddleElem;
        this.velocity = INIT_VELOCITY;
        this.reset();
        this.rect();
    }

    get position()
    {
        return parseFloat(getComputedStyle(this.PaddleElem).getPropertyValue("--position"));
    }
    set position(value)
    {
        let prev_pos = parseFloat(getComputedStyle(this.PaddleElem).getPropertyValue("--position"));
        // console.log("prev_pos"+prev_pos)
        if(prev_pos > 5 && value < 0)
        {
            prev_pos += -1 * this.velocity;
            // console.log("before floor" + prev_pos);
            prev_pos = Math.ceil(prev_pos);
            // console.log("new" + prev_pos);
            this.PaddleElem.style.setProperty("--position",prev_pos);
        }
        if(prev_pos < 95 && value > 0)
        {
            prev_pos += value * this.velocity;
            prev_pos = Math.floor(prev_pos);
            // console.log("new" + prev_pos);
            this.PaddleElem.style.setProperty("--position",prev_pos);
        }
    }
    update(delta)
    {
        this.velocity += VELOCTIY_INCREASE * delta; 
    }
    reset()
    {
        this.PaddleElem.style.setProperty("--position",50);
        this.velocity = INIT_VELOCITY;
    } 
    rect()
    {
        return this.PaddleElem.getBoundingClientRect();
    }
}