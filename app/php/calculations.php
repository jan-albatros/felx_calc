<?php
	// Flex Calc App. Save results lib.
	//echo "Waiting for request...<br/>";
	

	if(!empty($_POST)){
		
		// Get sum from the HTTP request
		if (isset($_POST['sum'])){
			$sum = $_POST['sum'];	
		}
		// Get IP
		if(!empty($_SERVER['HTTP_CLIENT_IP'])){
	        $ip = $_SERVER['HTTP_CLIENT_IP'];
	    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
	        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	    }else{
	        $ip = $_SERVER['REMOTE_ADDR'];
	    
	    }
		// Get date
	    $date = new DateTime();
		$date = $date->format('Y-m-d');
		
		// Get browser
		$browser = "Unknown agent";
		$browser = $_SERVER['HTTP_USER_AGENT'] . "\n\n";
		$browser = substr($browser,0,14).'...';

		// Save to file
		$fname = "calculations.csv";
		$file = fopen($fname, 'a');//creates new file
		//$file = fopen($fname, 'w');//creates new file
		fwrite($file, $sum."; ".$ip."; ".$date."; ".$browser."\n");
		fclose($file);
	} else {
		// Print results in primitive form:
		$fname = "calculations.csv";
		/*
		$fname = "calculations.csv";
		$file = fopen($fname, 'r');//creates new file
		$string = fread($file, 25000);
		fclose($file);
		echo nl2br($string);
		*/
		if($file = fopen($fname, 'r')){
			echo "<table>";
			$i = 0;
			while (($line = fgetcsv($file,null,';')) !== FALSE) {
			  	if($i == 0){
			  		echo "<tr>";
					echo "<th>".$line[0] . "</th>";
					echo "<th>".$line[1] . "</th>";
					echo "<th>".$line[2] . "</th>";
					echo "<th>".$line[3]. "</th>";
					echo "</tr>";
			  	} else {
			  		echo "<tr>";
					echo "<td>".$line[0] . " </td>";
					echo "<td>".$line[1] . " </td>";
					echo "<td>".$line[2] . " </td>";
					echo "<td>".$line[3] . " </td>";
					echo "</tr>";
			  	}
			  	$i++;
			}

			echo "</table>";
			fclose($file);	
		}
	}


?>
