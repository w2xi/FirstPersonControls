function init()
{
	const world = new World()

	world.addStats()
	world.addControls()
	world.addHelper()

	const { scene, camera } = world.three

	const cube = world.createCube(8)

	scene.add(cube)

	// world.updatables.push(cube)

	world.updatables.push(camera)
}