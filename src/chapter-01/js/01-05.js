function init()
{
	const world = new World()

	world.addAxesHelper().addGridHelper()
	world.addStats().addControls()

	const { scene } = world.three

	const cube = world.createCube(50)

	scene.add(cube)
}