import SpriteText from "three-spritetext";
import data from "./data.json"
import { useEffect, useRef, useState } from "react";
import ForceGraph3D, { ForceGraphMethods } from "react-force-graph-3d";

export default ({selected, targets}: {selected?: string, targets: Array<string>}) => {
    const ref = useRef<any>();
    const gRef = useRef<ForceGraphMethods | undefined>(undefined);
    const [width, setWidth] = useState(0);
    
    useEffect(() => {
        if (!ref || !ref.current) return
        setWidth(ref?.current.offsetWidth);
    }, []);

    console.log(targets)
    return (
        <div ref={ref}>
            <ForceGraph3D
                ref={gRef}
                graphData={data}
                width={width}
                nodeAutoColorBy="group"
                linkDirectionalArrowLength={(link:any) => link.source.id == selected ? 5 : 0}
                linkDirectionalArrowRelPos={1}
                linkWidth={(link:any) => link.source.id == selected ? 2 : 0.3}
                nodeThreeObject={(node:any) => {
                    const sprite = new SpriteText(node.id);
                    sprite.backgroundColor = "rgba( 255, 255, 255, 0 )"
                    sprite.color = selected == node.id? "green" : "rgba( 255, 255, 255, 0.3 )";
                    sprite.color = targets.includes(node.id)? "blue" : sprite.color;
                    sprite.textHeight = selected == node.id || targets.includes(node.id) ? 15 : 2;

                    const distance = 250;
                    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

                    if (selected == node.id && gRef.current) {
                        gRef.current.cameraPosition(
                            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
                                node, // lookAt ({ x, y, z })
                                1500  // ms transition duration
                            );
                    }
                    return sprite;
                }}
                linkThreeObjectExtend={true}
                linkThreeObject={(link:any) => {
                    // extend link with text sprite
                    if (link.source.id != selected) return new SpriteText();;
                    const sprite = new SpriteText(`${link.source.id} > ${link.target.id}`);
                    sprite.color = 'green';
                    sprite.textHeight = 5;
                    return sprite;
                }}
                linkPositionUpdate={(sprite, { start, end }) => {
                    const middlePos = {
                        x: start.x + (end.x - start.x) / 2,
                        y: start.y + (end.y - start.y) / 2,
                        z: start.z + (end.z - start.z) / 2
                    }
                    // Position sprite
                    Object.assign(sprite.position, middlePos);
                }}
                />
        </div>
    )
}