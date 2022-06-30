export const drawBox = (detection,ctx) =>{

    detection.map((result)=>{

        //Getting the prediction and box coordinates
        const [x,y,w,h]= result['bbox'];
        const predicition = result['class'];

        //Setting up the styles for the detection box
        const color= 'green';
        ctx.strokeStyle = color;
        ctx.font = '18px Arial';
        ctx.fillStylle = color;

        ctx.beginPath();
        ctx.fillText(predicition,x,y);
        ctx.rect(x,y,w,h);
        ctx.stroke()

    })

}