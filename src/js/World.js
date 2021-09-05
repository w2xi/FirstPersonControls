const clock = new THREE.Clock()

class World
{
	constructor(options = {}){
		options = options || {}

		this.updatables = []

		this.three = {
			scene: null,
			camera: null,
			renderer: null,
			controls: null
		}

		this.init()

		window.addEventListener('resize', this.onWindowResize.bind(this), false)
	}

	init(){
		this.createScene()
		this.createCamera()
		this.createRenderer()
		this.createLight()
		this.loop()
	}

	loop(){
		const { scene, camera, renderer, controls, stats } = this.three

		requestAnimationFrame(this.loop.bind(this))

		controls && controls.update()
		stats && stats.update()

		this.tick()

		renderer.render(scene, camera)
	}

	animate(){
		const { scene, camera, renderer, controls, stats } = this.three

		renderer.setAnimationLoop(() => {
			// .getDelta will tell us how much time has passed since the last 
			// time we called .getDelta
			const delta = clock.getDelta()

			console.log(
				`The last frame rendered in ${delta * 1000} milliseconds`
			)

			controls && controls.update()
			stats && stats.update()

			renderer.render(scene, camera)	
		})
	}

	tick(){
		const delta = clock.getDelta() * 1000

		if ( this.updatables.length ){
			this.updatables.forEach(object => {
				object.tick(delta)
			})
		}
	}

	createScene(){
		const scene = new THREE.Scene()
		// 0x303555 / 0x252b58
		scene.background = new THREE.Color(0x303555)
		// scene.fog = new THREE.FogExp2(0x252b58, 0.005)

		this.three.scene = scene
	}

	createCamera(){
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		
		camera.position.set(1, 70, -100)
		camera.lookAt(this.three.scene.position)

		this.three.camera = camera
		this.three.scene.add(camera)

		camera.tick = () => {
			// camera.position.z += 0.1
		}
	}

	createRenderer(){
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			powerPreference: 'high-performance',
		})
		
		renderer.setClearColor(new THREE.Color(0x000000))
		renderer.setSize(window.innerWidth, window.innerHeight)
		renderer.setPixelRatio(window.devicePixelRatio)

		renderer.shadowMap.enabled = true
		
		this.three.renderer = renderer
		// add the output of the renderer to the html element
		document.body.appendChild(renderer.domElement)
	}

	addControls(){
		const controls = new THREE.OrbitControls(this.three.camera, this.three.renderer.domElement)
		
		controls.update()
    // controls.enablePan = true
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    controls.screenSpacePanning = false

    // controls.minDistance = 100
		// controls.maxDistance = 500

    // controls.maxPolarAngle = Math.PI / 180 * 80
    // 为指定的DOM元素添加按键监听 推荐将window作为指定的DOM元素
    // controls.listenToKeyEvents( window );

    this.three.controls = controls

    return this
	}

	createLight(){
		// add subtle ambient lighting
		const ambientLight = new THREE.AmbientLight(0xf5f5f5)

		const pointLight = new THREE.PointLight(0xffffff, 2, 100)
		pointLight.position.set(0, 40, 0)

		const spotLight = new THREE.SpotLight(0xffffff)
		spotLight.position.set(0, 30, 0)

		this.three.scene.add(ambientLight)
		this.three.scene.add(pointLight)
		this.three.scene.add(spotLight)
	}

	addStats(){
		const stats = new Stats()

		document.body.appendChild(stats.dom)

		this.three.stats = stats

		return this
	}

	dispose(){
		const { scene, renderer, controls } = this.three

		window.removeEventListener('resize', this.onWindowResize, false)

		scene.travase(child => {
			if ( child instanceof THREE.Mesh ){
				child.geometry.dispose()
				child.material.dispose()
			}else if ( child instanceof THREE.Group ){
				child.clear()
			}else if ( child instanceof THREE.Object3D ){
				child.clear()
			}
		})

		THREE.Cache.clear()
		scene.clear()
		renderer.dispose()
		renderer.forceContextLoss()

		controls && controls.dispose()
	}

	addHelper(){
		this.addAxesHelper()
		this.addGridHelper()
	}

	addAxesHelper(size = 45){
		const { scene } = this.three
		const axesHelper = new THREE.AxesHelper(45)
		axesHelper.position.y = 1

		scene.add(axesHelper)

		return this
	}

	addGridHelper(){
		const { scene } = this.three
		const gridHelper = new THREE.GridHelper(1000, 100)

		scene.add(gridHelper)

		return this
	}

	createCube(sideLength = 10){
		const geometry = new THREE.BoxGeometry(sideLength, sideLength, sideLength)
		const material = new THREE.MeshBasicMaterial()
		const cube = new THREE.Mesh(geometry, material)

		cube.tick = (delta = 10) => {
			// cube.position.x += 0.01 * delta
			// cube.position.z += 0.01 * delta

			// cube.rotation.y += 6 * ( Math.PI / 180 )
			cube.rotation.y += 0.6 * ( Math.PI / 180 )
		}

		return cube
	}

	createSphere(radius = 10){
		const geometry = new THREE.SphereGeometry(radius, 32, 16)
		const material = new THREE.MeshBasicMaterial()
		const sphere = new THREE.Mesh(geometry, material)

		return sphere
	}

	onWindowResize(){
		const { scene, camera, renderer } = this.three

		const width = window.innerWidth
		const height = window.innerHeight

		camera.aspect = width / height
		camera.updateProjectionMatrix()

		renderer.setSize(width, height)
		renderer.setPixelRatio(window.devicePixelRatio)
	}
}

