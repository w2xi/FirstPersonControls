function init() {
	const world = new World()

	const { scene } = world.three

	const cube = world.createCube()
	
	cube.position.x = 2
	cube.position.y = 4
	cube.position.z = 6
	cube.name = 'cube'
	
	cube.updateMatrix()

	scene.add(cube)

	console.log('ByName', scene.getObjectByName(cube.name))
	console.log('ById', scene.getObjectById(cube.id))

	console.log(THREE.MathUtils.degToRad(90)) // 1.57079... = π/2)

	console.log(cube.rotation)
	console.log(cube.quaternion)
	console.log(cube.matrix)
}