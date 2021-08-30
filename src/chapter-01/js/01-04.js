function init()
{
	const world = new World({
		helper: true,
	})
	
	// translate.call(world)
	// rotation.call(world)
	scale.call(world)
}

function translate()
{
	const { scene } = this.three

	const cubeA = this.createCube()
	cubeA.position.x = 20

	scene.add(cubeA)

	const cubeB = this.createCube()
	cubeB.material.color.set(0xff0000)
	cubeB.material.wireframe = true
	cubeB.position.x = 20

	cubeA.add(cubeB)

	// ...

	console.log('cubeA position:', cubeA.position)
	console.log('cubeB position:', cubeB.position)

	console.log('cubeA matrix:', cubeA.matrix)
	console.log('cubeB matrix:', cubeB.matrix)

	console.log('cubeA matrixWorld:', cubeA.matrixWorld)
	console.log('cubeB matrixWorld:', cubeB.matrixWorld)
}

function rotation()
{
	const { scene } = this.three

	const cubeA = this.createCube()
	cubeA.rotation.x = THREE.MathUtils.degToRad(45)

	scene.add(cubeA)

	const cubeB = this.createCube()
	cubeB.material.color.set(0xff0000)
	cubeB.material.wireframe = true

	cubeB.position.x = 20
	cubeB.rotation.x = THREE.MathUtils.degToRad(45)

	cubeA.add(cubeB)

	// ...

	console.log('cubeA rotation:', cubeA.rotation)
	console.log('cubeB rotation:', cubeB.rotation)

	console.log('cubeA matrix:', cubeA.matrix)
	console.log('cubeB matrix:', cubeB.matrix)

	console.log('cubeA matrixWorld:', cubeA.matrixWorld)
	console.log('cubeB matrixWorld:', cubeB.matrixWorld)
}

function scale()
{
	const { scene } = this.three

	const cubeA = this.createCube()
	cubeA.scale.x = 2

	scene.add(cubeA)

	const cubeB = this.createCube()
	cubeB.material.color.set(0xff0000)
	cubeB.material.wireframe = true

	cubeB.position.x = 20
	// cubeB.scale.x = 2

	cubeA.add(cubeB)

	// ...

	console.log('cubeA scale:', cubeA.scale)
	console.log('cubeB scale:', cubeB.scale)

	console.log('cubeA matrix:', cubeA.matrix)
	console.log('cubeB matrix:', cubeB.matrix)

	console.log('cubeA matrixWorld:', cubeA.matrixWorld)
	console.log('cubeB matrixWorld:', cubeB.matrixWorld)
}