<?php

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: zayavka@zenith-prom.kz' . "\r\n";


$body = '

<meta charset="utf-8">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
  <tr>
    <td style="padding:20px;background:#f3f3f3;font-family: Arial,sans-serif;">

      <table cellpadding="0" cellspacing="0" border="0" align="center" background="#ffffff"
             style="max-width:700px;background: #fff; box-shadow: 0 10px 30px 0 rgba(0,0,0,.3);">

        <tr>

          <td style="background:#fff;padding:0 10px;">

            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;">
              <tr>
                <td style="padding:30px 30px 15px 15px;text-align:center;">
                  <img src="http://layout.paradigma-digital.ru/zenith/images/logo.png" alt="Zenith" width="160" height="36">
                </td>
              </tr>
            </table>

          </td>

        </tr>

        <tr>

          <td
            style="color: #000;	background: #fff;	padding: 30px 30px 0 30px;	text-align: center;	font-size: 24px;	line-height: 30px;	font-weight: bold;">

            Новая заявка.

          </td>

        </tr>

        <tr>

          <td
            style="background: #fff;padding: 20px 30px 0 30px;text-align: center;font-size: 15px;line-height: 22px;color: #000;">

            Поступила заявка с сайта.

          </td>

        </tr>

        <tr>

          <td style="background: #fff;padding:30px;">

            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="padding:20px;border:1px solid #E44B4B;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
';

if ($_POST['name']) {
	$body.='
  
      <tr>
        <td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Имя:</td>
        <td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['name'].'</td>
      </tr>  
  
  ';
}


if ($_POST['phone']) {
	$body.='
  
      <tr>
        <td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Телефон:</td>
        <td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['phone'].'</td>
      </tr>  
  
  ';
}

if ($_POST['email']) {
	$body.='
  
      <tr>
        <td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Почта:</td>
        <td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['email'].'</td>
      </tr>  
	  
  ';
}

if ($_POST['message']) {
	$body.='

		<tr>
			<td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Сообщение:</td>
			<td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['message'].'</td>
		</tr>

	';
}

if ($_POST['serv']) {
	$body.='

		<tr>
			<td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Услуга:</td>
			<td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['serv'].'</td>
		</tr>

	';
}

if ($_POST['obj']) {
	$body.='

		<tr>
			<td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Объект:</td>
			<td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['obj'].'</td>
		</tr>

	';
}

if ($_POST['prepare']) {
	$body.='

		<tr>
			<td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Подготовка:</td>
			<td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['prepare'].'</td>
		</tr>

	';
}

if ($_POST['coating']) {
	$body.='

		<tr>
			<td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Тип покрытия:</td>
			<td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['coating'].'</td>
		</tr>

	';
}

if ($_POST['area']) {
	$body.='

		<tr>
			<td style="font-family:Verdana,Helvetica,sans-serif;font-size:13px;line-height:22px;color:#000;vertical-align:top;padding:0 60px 1px 0;white-space:nowrap;">Площадь, м&sup2;:</td>
			<td style="font-family:Verdana,Helvetica,sans-serif;color:#000;font-size:15px;line-height:22px;vertical-align:top;padding:0 0 4px 0;">'.$_POST['area'].'</td>
		</tr>

	';
}





$body.='

                  </table>

                </td>

              </tr>

              <tr>
                <td style="text-align: center;font-size: 12px;line-height: 16px;color:#ccc;padding: 20px 0 27px 0;">
                  &copy; Zenith, 2021
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>

';

// Отправка письма пользователю, если указан email
/*
if ($_POST['email']) {
  mail($_POST['email'], $_POST['subject'], $body, $headers);
}
*/
// Отправка письма администратору

mail('zayavka@zenith-prom.kz', $_POST['subject'], $body, $headers);
mail('dmitriikazackii@gmail.com', $_POST['subject'], $body, $headers);
mail('max@paradigma-digital.ru', $_POST['subject'], $body, $headers);

//echo $body;

?>