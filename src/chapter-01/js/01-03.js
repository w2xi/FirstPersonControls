function init() {
	const world = new World({
		helper: true,
	})
	const { scene } = world.three

	const cube = world.createCube()
	cube.name = 'cube'

	scene.add(cube)

	console.log('ByName', scene.getObjectByName(cube.name))
	console.log('ById', scene.getObjectById(cube.id))
}