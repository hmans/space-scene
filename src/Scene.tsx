import {
  Environment,
  OrbitControls,
  PerspectiveCamera
} from "@react-three/drei"
import { composable, Layer, modules } from "material-composer-r3f"
import { bitmask, Layers } from "render-composer"
import { Fresnel, Vec3 } from "shader-composer"
import { Color } from "three"
import { store } from "./state"
import { AsteroidBelt } from "./vfx/AsteroidBelt"
import { Nebula } from "./vfx/Nebula"

export const Scene = () => {
  return (
    <group>
      {/* Environment */}
      <Environment
        background="only"
        files={[
          "/textures/skybox/right.png",
          "/textures/skybox/left.png",
          "/textures/skybox/top.png",
          "/textures/skybox/bottom.png",
          "/textures/skybox/front.png",
          "/textures/skybox/back.png"
        ]}
      />

      {/* Lights */}
      <ambientLight
        intensity={0.05}
        layers-mask={bitmask(Layers.Default, Layers.TransparentFX)}
      />

      <OrbitControls />
      <PerspectiveCamera position={[0, 0, 75]} makeDefault />

      {/* The Planet */}
      <group position={[0, 0, 0]} rotation={[0.8, 0.2, -0.3]}>
        <Nebula
          dimensions={Vec3([40, 10, 40])}
          amount={40}
          opacity={0.2}
          rotationSpeed={0.05}
          maxSize={20}
          minSize={10}
          color={new Color("#fff").multiplyScalar(20)}
        />

        <mesh scale={10}>
          <sphereGeometry args={[1, 32, 32]} />

          <composable.meshStandardMaterial metalness={0.5} roughness={0.6}>
            <modules.Color color={new Color("#543")} />
            <Layer opacity={Fresnel({ power: 3 })}>
              <modules.Color color={new Color("white").multiplyScalar(2)} />
            </Layer>
          </composable.meshStandardMaterial>
        </mesh>

        <AsteroidBelt />
      </group>

      <mesh ref={(sun) => store.set({ sun })} position={[80, 15, -100]}>
        <directionalLight
          intensity={1.5}
          layers-mask={bitmask(Layers.Default, Layers.TransparentFX)}
        />
        <sphereGeometry args={[10]} />
        <meshBasicMaterial color={new Color("white").multiplyScalar(30)} />
      </mesh>
    </group>
  )
}
