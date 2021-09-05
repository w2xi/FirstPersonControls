import { createScene } from './components/scene.js'
import { createCamera } from './components/camera.js'
import { createRenderer } from './components/renderer.js'

let scene, camera, renderer

class World
{
	constructor(){
		scene = createScene()
		camera = createCamera()
		renderer = createRenderer()
	}
}