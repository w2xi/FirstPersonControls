/**
 * 使用 MeshLambertMaterial 材质的集合体无法 接收阴影 ( receiveShadow )
 * 
 */

function init()
{
	const scene = new THREE.Scene()
	scene.add(new THREE.AxesHelper(35))
	
	const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
	camera.position.set(40, 40, 40)
	camera.lookAt(scene.position)

	const renderer = new THREE.WebGLRenderer()
	
	renderer.setSize(window.innerWidth, window.innerHeight)
	// 如果设置开启，允许在场景中使用阴影贴图。默认是 false。
	renderer.shadowMap.enabled = true

	{
		const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
		const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xaa0000 })
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

		sphere.castShadow = true 
		sphere.position.z = 10
		sphere.position.y = 5

		scene.add(sphere)
	}

	{
		const cubeGeometry = new THREE.BoxGeometry(4, 4, 4)
		const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
		const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

		cube.castShadow = true
		cube.position.set(0, 2, -6)

		scene.add(cube)
	}

	{
		const planeGeometry = new THREE.PlaneGeometry(80, 50)
		const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x999999 })
		const plane = new THREE.Mesh(planeGeometry, planeMaterial)

		plane.receiveShadow = true
		plane.rotation.x = -Math.PI / 2
		plane.rotation.z = Math.PI / 2

		scene.add(plane)
	}

	{
		const spotLight = new THREE.SpotLight(0xf5f5f5)
		
		spotLight.position.set(-40, 60, -20)
		spotLight.castShadow = true 
		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;
		spotLight.shadow.camera.near = 40;
		spotLight.shadow.camera.far = 130;

		scene.add(spotLight)
	}

	{
		const ambientLight = new THREE.AmbientLight(0x353535)
		scene.add(ambientLight)
	}

	document.body.appendChild(renderer.domElement)
	renderer.render(scene, camera)
}

