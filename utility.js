
$( document ).ready(function() {
	console.log( "ready!" );
	 $('#title').html(chrome.i18n.getMessage("name"));
	 $('#timer').html(chrome.i18n.getMessage("timer"));
	 $('#timer_label').html(chrome.i18n.getMessage("timer_label"));
	 $('#btn_submit').html(chrome.i18n.getMessage("btn_submit"));
	 $('#btn_clean').html(chrome.i18n.getMessage("btn_clean"));
	 $('#timer_shutdown_label').html(chrome.i18n.getMessage("timer_shutdown_label"));
	 $('#error_span').hide();
	 $('#confirm_span').hide();

	$('#btn_submit').bind('click', function() {
	  	$('#error_span').hide();
	 	$('#confirm_span').hide();
	  	var time_value = $('#time_input').val();
		var shutdown_value = $('#time_shutdown_input').val();
		if(isNaN(time_value) || isNaN(shutdown_value)) {
			$('#error_span').html("Please insert a number!");
			$('#error_span').show();
			return;
		}
		chrome.extension.getBackgroundPage().setFacebookTimer(time_value);
		chrome.extension.getBackgroundPage().setFacebookTimerShutdown(shutdown_value);
		$('#confirm_span').html("Yeah Good!");
		$('#confirm_span').show();
	});

	$('#btn_clean').bind('click', function() {
		$('#error_span').hide();
	 	$('#confirm_span').hide();
	 	$('#time_input').val("");
		$('#time_shutdown_input').val("");
	});
});
