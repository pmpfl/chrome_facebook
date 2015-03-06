
$( document ).ready(function() {
	console.log( "ready!" );
	 $('#title').html(chrome.i18n.getMessage("name"));
	 $('#timer').html(chrome.i18n.getMessage("timer"));
	 $('#minutes').html(chrome.i18n.getMessage("minutes"));
	 $('#timer_shutdown_label').html(chrome.i18n.getMessage("timer_shutdown_label"));
	 $('#btn_submit').html(chrome.i18n.getMessage("btn_submit"));
	 $('#btn_clean').html(chrome.i18n.getMessage("btn_clean"));	
	 $('#time_shutdown_input').val(chrome.extension.getBackgroundPage().getFacebookTimerShutDown());
	 $('#error_span').hide();
	 $('#confirm_span').hide();

	 for (i = 0; i < 60; i++) {
		$("#time_shutdown_select").append(new Option(i, i));
	 }
	 $('#time_shutdown_select').val(chrome.extension.getBackgroundPage().getFacebookTimerShutDown());
	

	$('#btn_submit').bind('click', function() {
	  	$('#error_span').hide();
	 	$('#confirm_span').hide();
	  	var shutdown_value = $('#time_shutdown_select').val();
		if(isNaN(shutdown_value)) {
			$('#error_span').html("Please insert a number!");
			$('#error_span').show();
			return;
		}
		chrome.extension.getBackgroundPage().setFacebookTimerShutdown(shutdown_value);
		$('#confirm_span').html("Yeah Good!");
		$('#confirm_span').show();
	});

	$('#btn_clean').bind('click', function() {
		$('#error_span').hide();
	 	$('#confirm_span').hide();
	 	$('#time_shutdown_input').val("");
	 	chrome.extension.getBackgroundPage().setFacebookTimerShutdown(0);
	});
});
