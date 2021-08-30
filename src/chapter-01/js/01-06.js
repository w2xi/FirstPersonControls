function init()
{
	const world = new World()
	
	world.addStats()
	world.addControls()
	world.addHelper()

	const { scene } = world.three

	const pivot = new THREE.Object3D()

	scene.add(pivot)

	const cube = world.createSphere()
	cube.position.set(20, 0, 20)

	pivot.add(cube)

	setInterval(() => {
		pivot.rotation.y += 0.01
	}, 16.7)
}