import { PerspectiveCamera, Vector3 } from 'three'

function createCamera()
{
	const fov = 75 // field of view
	const aspect = window.innerWidth / window.innerHeight
	const near = 0.1 // near clipping palne
	const far = 1000 // far  clipping plane

	const camera = new PerspectiveCamera(fov, aspect, near, far)

	camera.position.set(40, 40, 40)
	camera.lookAt(new Vector3(0, 0, 0))

	return camera
}

export { createCamera }