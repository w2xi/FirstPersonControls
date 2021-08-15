class Base
{
	constructor(){
		this.three = {
			scene: null,
			camera: null,
			renderer: null,
			controls: null
		}

		this.init()
	}

	init(){
		this.addScene()
		this.addCamera()
		this.addRenderer()
		this.addControls()
		this.addLight()
		this.animate()
	}

	animate(){
		const { scene, camera, renderer } = this.three

		requestAnimationFrame(this.animate.bind(this))
		renderer.render(scene, camera)
	}

	addScene(){
		const scene = new THREE.Scene()
		// 0x303555 / 0x252b58
		scene.background = new THREE.Color(0x303555)
		scene.fog = new THREE.FogExp2(0x252b58, 0.005)

		this.three.scene = scene
	}

	addCamera(){
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
		
		camera.position.set(1, 70, -100)
		camera.lookAt(new THREE.Vector3(0, 0, 0))

		this.three.camera = camera
		this.three.scene.add(camera)
	}

	addRenderer(){
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

	  //   controls.minDistance = 100
			// controls.maxDistance = 500

	    // controls.maxPolarAngle = Math.PI / 180 * 80
	    // 为指定的DOM元素添加按键监听 推荐将window作为指定的DOM元素
	    // controls.listenToKeyEvents( window );

	    this.three.controls = controls
	}

	addLight(){
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

	onWindowResize(){
		const width = window.innerWidth
		const height = window.innerHeight

		const { camera, renderer } = this.three

		renderer.setSize(width, height)

		camera.aspect = width / height
		camera.updateProjectionMatrix()
	}
}

