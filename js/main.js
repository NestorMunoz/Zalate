if (navigator.serviceWorker) {
	navigator.serviceWorker.register("/offline/sw.js")
}

;(function(){
	/* --- SLIDER --- */
	let currentPosition = 0
	const imageCounter = $("[data-name='image-counter']").attr("content")
	setInterval(()=>{
		if (currentPosition < imageCounter) {
			currentPosition++
		} else {
			currentPosition = 0
		}

		$("#gallery .inner").css({
			left: "-"+(currentPosition*100)+"%"
		})
	}, 3000)


	/* --- STICKY NAVIGATION --- */
	let sticky = false
	$("#sticky-navigation").removeClass("hidden")
	$("#sticky-navigation").slideUp(0)
	checkScroll()
	isOpen()
	$(window).scroll(checkScroll)

	function checkScroll() {
		const inBottom = isInBottom()
		if (inBottom && !sticky) { /* --- SHOW NAVIGATION --- */
			sticky = true
			stickNavigation()
		} else if(!inBottom && sticky){	/* --- HIDDE NAVIGATION --- */
			sticky = false
			unStickNavigation()
		}
	}

	function stickNavigation(){
		$("#description").addClass("fixed").removeClass("absolute")
		$("#navigation").slideUp()
		$("#sticky-navigation").slideDown()
	}

	function unStickNavigation(){
		$("#description").removeClass("fixed").addClass("absolute")
		$("#navigation").slideDown()
		$("#sticky-navigation").slideUp()
	}

	function isInBottom(){
		const $description = $("#description")
		const descriptionHeight = $description.height()
		return $(window).scrollTop() > $(window).height() - (descriptionHeight * 2)
	}

	/* --- ZALATE SCHEDULE --- */
	function isOpen(){
		const current_hour = new Date().getHours()
		const current_mins = new Date().getMinutes()
		if (current_hour > 18 || (current_hour == 0 && current_mins < 30)) {
			$("#schedule .schedule").html("Abierto ahora")
		}
	}

	/* --- RESPONSIVE DESIGN --- */
	$("#menu-opener").on("click", toggleNav)
	$(".menu-link").on("click",toggleNav)

	function toggleNav(){
		$("#responsive-nav ul").toggleClass("active")
		$("#menu-opener").toggleClass("glyphicon-menu-hamburger")
	}
})()
