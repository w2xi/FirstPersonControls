function loadAsyncGLTF(url)
{
	const loader = new THREE.GLTFLoader()

	return loader.loadAsync(url)
}

function sleep(millisecond)
{
	return new Promise(resolve => {
		setTimeout(resolve, millisecond)
	})
}

