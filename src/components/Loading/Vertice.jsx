/* eslint-disable no-import-assign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Canvas } from "react-three-fiber";
import { useWindowSize } from "../hooks/useWindowSize/index";
import * as THREE from "three";
export default function Vertice() {
    const window = useWindowSize();
    return (
        <Canvas>
            <perspectiveCamera
                fov={45}
                aspect={window.width / window.height}
                near={1}
                far={1000}
            />
            <fog color="0xd4d4d4" near={8} far={20} />
            {
                // @ts-ignore
                <CustomeIcosahedronGeopetry />
            }
        </Canvas>
    );
}

const CustomeIcosahedronGeopetry = (radius = 10, detail = 1) => {
    THREE.IcosahedronGeometry = function (radius, detail) {
        const t = (1 + Math.sqrt(5)) / 2;
        const vertices = [
            -1,
            t,
            0,
            1,
            t,
            0,
            -1,
            -t,
            0,
            1,
            -t,
            0,
            0,
            -1,
            t,
            0,
            1,
            t,
            0,
            -1,
            -t,
            0,
            1,
            -t,
            t,
            0,
            -1,
            t,
            0,
            1,
            -t,
            0,
            -1,
            -t,
            0,
            1,
        ];
        const indices = [
            0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4,
            11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3,
            8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1,
        ];
        //@ts-ignore
        THREE.PolyhedronGeometry.call(this, vertices, indices, radius, detail);
        // @ts-ignore
        this.type = "IcosahedronGeometry";
        // @ts-ignore
        this.parameters = {
            radius: radius,
            detail: detail,
        };
    };

    THREE.IcosahedronGeometry.prototype = Object.create(
        THREE.PolyhedronGeometry.prototype,
    );
    THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry;
    const mesh = new THREE.IcosahedronGeometry(radius, detail);
    // @ts-ignore
    const vertices = mesh.vertices;
    const positions = new Float32Array(vertices.length * 3);
    for (let i = 0, l = vertices.length; i < l; i++) {
        vertices[i].toArray(positions, i * 3);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        size: 0.4,
        // @ts-ignore
        vertexColors: THREE.vertexColors,
        color: 0x252525,
    });
    const points = new THREE.Points(geometry, material);
    const object = new THREE.Object3D();
    object.add(points);
    object.add(
        new THREE.Mesh(
            mesh,
            new THREE.MeshPhongMaterial({
                color: 0x616161,
                emissive: 0xa1a1a1,
                wireframe: true,
                fog: true,
            }),
        ),
    );
    // @ts-ignore
    return <primitive ojbect={object} />;
};
