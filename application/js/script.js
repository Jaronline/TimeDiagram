(function() {
	/** @type {HTMLInputElement} */
	const backgroundInput = document.getElementById("background");
	/** @type {HTMLInputElement} */
	const ratioInput = document.getElementById("ratio");
	/** @type {HTMLInputElement} */
	const totalEnabledInput = document.getElementById("total-enabled");
	/** @type {HTMLInputElement} */
	const durationInput = document.getElementById("duration");
	/** @type {HTMLInputElement} */
	const hertzInput = document.getElementById("hertz");
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");
	ctx.strokeStyle = "#000";

    	let lengthPerCycle = 100 / ratioInput.value;

	function getInterval(hertz) {
		return 1 / hertz;
	}

	function getCycles(duration, interval) {
		return duration / interval;
	}

	function drawLine(ctx, x1, y1, x2, y2, offsetX = 0) {
		ctx.beginPath();
		ctx.moveTo(x1 + offsetX, y1);
		ctx.lineTo(x2 + offsetX, y2);
		ctx.closePath();
		ctx.stroke();
	}

	function drawTriangle(ctx, x1, y1, x2, y2, x3, y3) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineTo(x3, y3);
		ctx.closePath();
		ctx.fill();
	}

	function drawRect(ctx, x, y, width, height) {
		ctx.fillRect(x, y, width, height);
	}

	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x1
	 * @param {number} y1
	 * @param {number} x2
	 * @param {number} y2
	 * @param {string} [label=""]
	 */
	function drawArrow(ctx, x1, y1, x2, y2, label = "") {
		const height = y2 - y1;
		drawRect(ctx, x1 + height, y1 + height / 4, x2 - x1 - height * 2, height / 2);
		ctx.textAlign = "center";
		ctx.fillText(label, x1 + (x2 - x1) / 2, y2 + 10);
		drawTriangle(
			ctx,
			x1,
			y1 + height / 2,
			x1 + height,
			y1,
			x1 + height,
			y2
		);
		drawTriangle(
			ctx,
			x2,
			y2 - height / 2,
			x2 - height,
			y2,
			x2 - height,
			y1
		);
	}

	function drawCycle(ctx, height, lineLength, offsetX = 0) {
		drawLine(ctx, 0, height / 2, 0, 0, offsetX);
		drawLine(ctx, 0, 0, lineLength, 0, offsetX);
		drawLine(ctx, lineLength, 0, lineLength, height, offsetX);
		drawLine(ctx, lineLength, height, lineLength * 2, height, offsetX);
		drawLine(ctx, lineLength * 2, height, lineLength * 2, height / 2, offsetX);
	}

	function updateCanvas(interval, cycles) {
		canvas.width = 220;
		canvas.height = 170;
		ctx.fillStyle = "#000";
		const lineLength = lengthPerCycle;
		canvas.width = lineLength * cycles * 2;
		for (let i = 0; i < cycles; i++) {
	    		drawCycle(ctx, canvas.height - 55, lineLength, lineLength * 2 * i);
		}
		drawArrow(ctx, 0, canvas.height - 45, lineLength * 2, canvas.height - 35, interval + " sec");
		if (totalEnabledInput.checked && cycles > 1) {
	    		drawArrow(ctx, 0, canvas.height - 20, canvas.width, canvas.height - 10, durationInput.value + " sec");
		}
		const data = canvas.toDataURL();
		canvas.width += 20;
		canvas.height += 20;
		const img = document.createElement("img");
		img.onload = () => {
			if (backgroundInput.checked) {
			ctx.fillStyle = "#fff";
			drawRect(ctx, 0, 0, canvas.width, canvas.height);
			}
			ctx.drawImage(img, 10, 10);
		}
		img.src = data;
	}

	function generateURLParams() {
		const urlParams = new URLSearchParams();
		if (backgroundInput.checked) {
			urlParams.append("bg", "");
		}
		urlParams.append("r", ratioInput.value);
		if (totalEnabledInput.checked) {
			urlParams.append("t", "");
		}
		urlParams.append("d", durationInput.value);
		urlParams.append("h", hertzInput.value);
		return urlParams
			.toString()
			.replaceAll("=&", "&")
			.replace(/=$/g, "");
	}

	function update() {
		const urlParams = generateURLParams();
		history.pushState(null, null,  urlParams !== "" ? `?${urlParams}` : "./");

		const interval = getInterval(hertzInput.value);
		const duration = durationInput.value;
		const cycles = getCycles(duration, interval);
		updateCanvas(interval, cycles);
	}

    	update();

    	backgroundInput.addEventListener("change", update);

	ratioInput.addEventListener("input", () => {
		lengthPerCycle = 100 / ratioInput.value;
		update();
	});

	totalEnabledInput.addEventListener("change", update);
	durationInput.addEventListener("input", update);
	hertzInput.addEventListener("input", update);

	document.getElementById("download").addEventListener("click", () => {
		const link = document.createElement("a");
		link.download = "tijddiagram.png";
		link.href = canvas.toDataURL();
		link.click();
	});
})();
