if (document.domain == 'localhost') WEB_ROOT = window.location.protocol + "//localhost:" + window.location.port + "/";
else WEB_ROOT = window.location.protocol + "//" + document.domain + '/';

/**
 * Propuesta de traducciÃ³n para hacerle a Gabriel
 */
const full_url = window.location.href;
let locale = '';
if (full_url.includes('/en/')) {
	locale = 'en_GB';
} else if (full_url.includes('/de/')) {
	locale = 'de_DE';
} else {
	locale = 'es_ES';
}

const __ = string_to_translate => {

	const translations = {
		'Â¡HECHO!': {
			'en_GB': 'DONE!',
			'de_DE': 'GETAN!',
		},
		'GrÃ¡ficas de la competencia': {
			'en_GB': 'Competitors graphic',
			'de_DE': 'Wettbewerbsgrafik',
		},
		'Fichero subido correctamente': {
			'en_GB': 'File uploaded successfully',
			'de_DE': '',
		},
		'ERROR al subir la imagen': {
			'en_GB': 'ERROR uploading image',
			'de_DE': '',
		},
		'No has cargado ningÃºn fichero': {
			'en_GB': 'There is no file selected to upload',
			'de_DE': '',
		},
		'Logo borrado correctamente': {
			'en_GB': 'Logo deleted successfully',
			'de_DE': '',
		},
		'Fallo al borrar el logo': {
			'en_GB': '',
			'de_DE': '',
		}

	};
	//console.log(string_to_translate);
	//console.log( translations[ string_to_translate ][ locale ] );
	if (locale === 'es_ES') {

		return string_to_translate;

	} else {

		return translations[string_to_translate] && translations[string_to_translate][locale] ?
			translations[string_to_translate][locale] :
			string_to_translate;

	}
};
//********************************************** */

arrayTextos = [];
arrayTextos['1'] = "Datos fiscales";
arrayTextos['2'] = "El cambio de datos fiscales se ha REALIZADO CORRECTAMENTE";
arrayTextos['3'] = "ERROR";
arrayTextos['4'] = "No se ha podido cambiar los datos fiscales";
arrayTextos['5'] = "Trial no vÃ¡lido";
arrayTextos['6'] = "No es posible volver a acceder a la versiÃ³n de prueba";
arrayTextos['7'] = "CÃ³digo no vÃ¡lido";
arrayTextos['8'] = "El cÃ³digo de promociÃ³n indicado no es vÃ¡lido";
arrayTextos['9'] = "CÃ³digo vÃ¡lido";
arrayTextos['10'] = "El usuario no es vÃ¡lido";
arrayTextos['11'] = "La clave no es vÃ¡lida";
arrayTextos['12'] = "Se ha producido un error";
arrayTextos['13'] = "Contacto";
arrayTextos['14'] = "Es necesario indicar un email de contacto";
arrayTextos['15'] = "Registro";
arrayTextos['16'] = "Es necesario indicar un email correcto";
arrayTextos['17'] = "Es necesario indicar el texto";
arrayTextos['18'] = "Envio correcto";
arrayTextos['19'] = "El mensaje se ha enviado\nTe responderemos en breve";
arrayTextos['20'] = "Ha habido un error. IntÃ©ntalo de nuevo mÃ¡s tarde";
arrayTextos['21'] = "Es necesario aceptar la polÃ­tica de privacidad para continuar";
arrayTextos['22'] = "Es necesario indicar el email de usuario";
arrayTextos['23'] = "Es necesario indicar un email correcto";
arrayTextos['24'] = "Es necesario indicar una clave de acceso";
arrayTextos['25'] = "La clave y su repeticiÃ³n no coinciden";
arrayTextos['26'] = "Â¿CÃ³mo nos conociste?";
arrayTextos['27'] = "Es necesario indicar cÃ³mo nos conociste";
arrayTextos['28'] = "Tipo de usuario";
arrayTextos['29'] = "Es necesario indicar el tipo de usuario que eres";
arrayTextos['2901'] = 'Es necesario indicar cÃ³mo nos conociste y el tipo de usuario que eres';
arrayTextos['30'] = "Encuesta bloqueada";
arrayTextos['31'] = "La encuesta no se volverÃ¡ a mostrar";
arrayTextos['32'] = "Gracias";
arrayTextos['33'] = "Â¿Bloquear preguntas?";
arrayTextos['34'] = "Â¿EstÃ¡s seguro de querer bloquear las preguntas y no responderlas nunca?";
arrayTextos['35'] = "Si";
arrayTextos['36'] = "No";
arrayTextos['37'] = "Si, no quiero responder";
arrayTextos['38'] = "No, voy a responder";
arrayTextos['39'] = "CÃ³digo no apropiado";
arrayTextos['40'] = "El cÃ³digo de promociÃ³n indicado no se ajusta a este producto";
arrayTextos['41'] = "Restablecer clave";
arrayTextos['42'] = "Es necesario indicar el email de usuario";
arrayTextos['43'] = "Pago correcto";
arrayTextos['44'] = "El pago ha sido realizado correctamente. Gracias";
arrayTextos['45'] = "Sin datos de PayPal";
arrayTextos['46'] = "El pago parece correcto pero PayPal todavÃ­a no nos ha mandado los datos, te avisaremos cuando los recibamos";
arrayTextos['47'] = "La clave indicada estÃ¡ vacÃ­a";
arrayTextos['48'] = "La clave indicada no coincide con la repeticiÃ³n";
arrayTextos['49'] = "Todos los campos tienen que estar correctamente rellenos";
arrayTextos['50'] = "Keywords copiadas";
arrayTextos['51'] = "Las keywords han sido copiadas al portapapeles";
arrayTextos['52'] = "No se han podido copiar las keywords al portapapeles";
arrayTextos['53'] = "Es necesario elegir un tipo de producto";
arrayTextos['54'] = "Es necesario indicar un nombre para generar la factura";
arrayTextos['55'] = "Es necesario indicar una direcciÃ³n paga generar la factura";
arrayTextos['56'] = "Es necesario indicar el pais";
arrayTextos['57'] = "Es necesario indicar la forma de pago";
arrayTextos['58'] = "Es necesario indicar la ciudad";
arrayTextos['59'] = "Prueba activada";
arrayTextos['60'] = "Acceso de prueba activado hasta";
arrayTextos['61'] = "Es necesario indicar la clave actual";
arrayTextos['62'] = "Es necesario indicar la nueva clave";
arrayTextos['63'] = "La nueva clave y su repeticiÃ³n no coinciden";
arrayTextos['64'] = "Cambio de clave";
arrayTextos['65'] = "El cambio de clave se ha REALIZADO CORRECTAMENTE";
arrayTextos['66'] = "La clave actual NO ES CORRECTA";
arrayTextos['67'] = "Las claves indicadas estÃ¡n vacÃ­as";
arrayTextos['68'] = "No se ha podido cambiar la clave";
arrayTextos['69'] = "Es necesario indicar un nombre fiscal o personal correcto";
arrayTextos['70'] = "Es necesario indicar el NIF / CIF de cara a la facturaciÃ³n";
arrayTextos['71'] = "Es necesario indicar la ciudad";
arrayTextos['72'] = "Es necesario indicar un dominio";
arrayTextos['73'] = "Es necesario indicar un dominio vÃ¡lido";
arrayTextos['74'] = "Dominio agregado";
arrayTextos['75'] = "El nuevo dominio se ha AGREGADO CORRECTAMENTE";
arrayTextos['76'] = "No se ha podido agregar el nuevo dominio";
arrayTextos['77'] = "Â¿Eliminar proyecto?";
arrayTextos['78'] = "Los datos del proyecto serÃ¡n eliminados, Â¿Seguro?";
arrayTextos['79'] = "Si, estoy seguro/a";
arrayTextos['80'] = "No, cancelar";
arrayTextos['81'] = "Proyecto seleccionado";
arrayTextos['82'] = "El proyecto ha sido SELECCIONADO CORRECTAMENTE";
arrayTextos['83'] = "No se ha podido seleccionar el proyecto";
arrayTextos['84'] = "Â¿Agregar keyword?";
arrayTextos['85'] = "Vas a agregar las keyword indicadas, Â¿Seguro?";
arrayTextos['86'] = "Â¿Eliminar keyword?";
arrayTextos['87'] = "Vas a eliminar la keyword y todos sus datos registrados Â¿Seguro?";
arrayTextos['88'] = "Es necesario marcar las keywords a eliminar";
arrayTextos['89'] = "Â¿Eliminar keywords?";
arrayTextos['90'] = "Vas a eliminar las keywords seleccionadas y todos sus datos registrados Â¿Seguro?";
arrayTextos['91'] = "Es necesario seleccionar una keyword";
arrayTextos['92'] = "Es necesario seleccionar un comparador";
arrayTextos['93'] = "Es necesario seleccionar una posiciÃ³n";
arrayTextos['94'] = "Alerta agregada";
arrayTextos['95'] = "La alerta se ha agregado correctamente";
arrayTextos['96'] = "Â¿Eliminar alerta?";
arrayTextos['97'] = "Vas a eliminar la alerta Â¿Seguro?";
arrayTextos['98'] = "Alerta eliminada";
arrayTextos['99'] = "La alerta se ha eliminado correctamente";
arrayTextos['100'] = "Es necesario indicar la anotaciÃ³n a agregar";
arrayTextos['101'] = "AnotaciÃ³n agregada";
arrayTextos['102'] = "La anotaciÃ³n se ha agregado correctamente";
arrayTextos['103'] = "Ha habido un error al agregar la anotaciÃ³n";
arrayTextos['104'] = "Â¿Eliminar anotaciÃ³n?";
arrayTextos['105'] = "La anotaciÃ³n se eliminarÃ¡ para siempre Â¿Seguro?";
arrayTextos['106'] = "AnotaciÃ³n eliminada";
arrayTextos['107'] = "La anotaciÃ³n se ha eliminado correctamente";
arrayTextos['108'] = "Ha habido un error al eliminar la anotaciÃ³n";
arrayTextos['109'] = "El aviso no se mostrarÃ¡ mÃ¡s";
arrayTextos['110'] = "Pero podrÃ¡s ver el video en la secciÃ³n Tutoriales";
arrayTextos['111'] = "Descartar";
arrayTextos['112'] = "No descartar";
arrayTextos['113'] = "Comenzar rastreo";
arrayTextos['114'] = "Los datos de rastreo anteriores, si existen, serÃ¡n reemplazados por los nuevos Â¿Seguro?";
arrayTextos['115'] = "Rastreo activado";
arrayTextos['116'] = "El proceso de rastreo se ha puesto en cola y comenzarÃ¡ muy pronto.";
arrayTextos['117'] = "Ya existe un rastreo pendiente";
arrayTextos['118'] = "Ha habido un error al activar el rastreo";
arrayTextos['119'] = "Rastreo finalizado";
arrayTextos['120'] = "El proceso de rastreo ha finalizado correctamente.";
arrayTextos['121'] = "Â¿Interrumpir el rastreo?";
arrayTextos['122'] = "Los datos rastreados se perderÃ¡n Â¿Seguro?";
arrayTextos['123'] = "Rastreo interrumpido";
arrayTextos['124'] = "El proceso de rastreo ha sido interrumpido.";
arrayTextos['125'] = "Se ha producido un error en la interrupciÃ³n";
arrayTextos['126'] = "Â¿Repetir anÃ¡lisis?";
arrayTextos['127'] = "Se repetirÃ¡ el anÃ¡lisis eliminando el anterior Â¿Seguro?";
arrayTextos['128'] = "Es necesario introducir una keyword de mÃ¡s de dos caracteres";
arrayTextos['129'] = "Comenzando el anÃ¡lisis";
arrayTextos['130'] = "Es necesario indicar un dominio correcto";
arrayTextos['131'] = "Es necesario indicar un pais";
arrayTextos['132'] = "Es necesario indicar un intervalo de fechas";
arrayTextos['133'] = "La fecha de fin tiene que ser superior o igual a la fecha de inicio";
arrayTextos['134'] = "Es necesario el tipo de incidencia a comunicar y la descripciÃ³n de la misma";
arrayTextos['135'] = "Ticket de soporte insertado";
arrayTextos['136'] = "Es necesario indicar la respuesta a la incidencia";
arrayTextos['137'] = "Soporte";
arrayTextos['138'] = "Es necesario indicar un lugar para geolocalizar";
arrayTextos['139'] = "El lugar indicado es demasiado corto";
arrayTextos['140'] = "Es necesario indicar la keyword para la que encontrar sugerencias";
arrayTextos['141'] = "Es necesario indicar el pais para el que se buscan las sugerencias";
arrayTextos['142'] = "Es necesario indicar el idioma para el que se buscan las sugerencias";
arrayTextos['143'] = "Es necesario indicar las urls en las que se ubican los enlaces";
arrayTextos['144'] = "Â¿Agregar urls?";
arrayTextos['145'] = "Vas a agregar las urls indicadas Â¿Seguro?";
arrayTextos['146'] = "Urls agregadas";
arrayTextos['147'] = "Las urls estÃ¡n a la espera de ser revisadas. Tras su revisiÃ³n se incorporarÃ¡n a los datos.";
arrayTextos['148'] = "El dominio indicado no es correcto";
arrayTextos['149'] = "Â¿Subdominio?";
arrayTextos['150'] = "Has especificado un subdominio, Â¿deseas trabajar sÃ³lo con ese subdominio o con el dominio completo?";
arrayTextos['151'] = "SÃ³lo el subdominio";
arrayTextos['152'] = "Dominio completo";
arrayTextos['153'] = "Dominio eliminado";
arrayTextos['154'] = "El dominio y sus datos han sido eliminados";
arrayTextos['155'] = "No se ha podido eliminar el dominio";
arrayTextos['156'] = "Keywords agregadas";
arrayTextos['157'] = "Las keyword indicadas han sido agregadas";
arrayTextos['158'] = "No hay ningÃºn proyecto seleccionado";
arrayTextos['159'] = "No se ha especificado una keyword vÃ¡lida";
arrayTextos['160'] = "No todas las keywords se han agregado. Se han alcanzado los lÃ­mites de uso.";
arrayTextos['161'] = "No se ha podido agregar la keyword";
arrayTextos['162'] = "Keyword eliminada";
arrayTextos['163'] = "La keyword ha sido eliminada";
arrayTextos['164'] = "No hay ningÃºn proyecto seleccionado";
arrayTextos['165'] = "No se ha podido eliminar la keyword";
arrayTextos['166'] = "Keywords eliminadas";
arrayTextos['167'] = "Las keywords han sido eliminadas";
arrayTextos['168'] = "No hay ningÃºn proyecto seleccionado";
arrayTextos['169'] = "No se ha podido eliminar las keywords";
arrayTextos['170'] = "Â¿CÃ³mo funciona la prominencia?";
arrayTextos['171'] = "La prominencia de DinoRANK se basa en unos conceptos muy simples: <br> &nbsp; <br> - Si la keyword estÃ¡ en la etiqueta Title, 2 puntos<br> - Si el title comienza por la keyword, 1 punto<br> - Si ademÃ¡s la keyword estÃ¡ en la primera mitad del Title, 1 punto<br> - Si la keyword estÃ¡ en el encabezado H1, 2 puntos<br> - Si el H1 empieza por la keyword, 1 punto<br> - Si la keyword estÃ¡ en al menos un encabezado H2, 1 punto<br> - Si la keyword estÃ¡ en el primer pÃ¡rrafo, 1 punto<br> - Si la keyword estÃ¡ en al menos una etiqueta alt de una imagen, 1 punto<br>";
arrayTextos['172'] = "Dinobot calcula el pagerank interno de cada una de las pÃ¡ginas de tu web y te muestra un grÃ¡fico en el que puedes ver su mayor o menor importancia en funciÃ³n del pagerank recibido, en base al tamaÃ±o de cada uno de los cÃ­rculos.<br>&nbsp;<br>Adicionalmente puedes ver los nodos en diferentes colores segÃºn la estructura de sus urls y mÃ¡s cerca de la home o mÃ¡s lejos, en funciÃ³n de la cantidad de clicks que son necesarios para llegar desde la home hasta esa pÃ¡gina en concreto.<br>&nbsp;<br>Bajo el grÃ¡fico tambiÃ©n se puede ver la lista de urls de tu sitio web, pudiendo seÃ±alar una de ellas en el grÃ¡fico (caso en que el nodo en cuestiÃ³n pasarÃ¡ a color negro con borde amarillo) o hacer click en el tÃ­tulo/url de la pÃ¡gina y entrar a ver mÃ¡s detalles sobre la misma.";
arrayTextos['173'] = "Dinobot detecta el modo en que las pÃ¡ginas de tu sitio web se enlazan entre sÃ­, generando un grÃ¡fico de arquitectura por enlazado que se basa en los primeros enlaces detectados desde la home hacia una pÃ¡gina y las rutas mÃ¡s cortas en nÃºmero de clicks. En este grÃ¡fico sÃ³lo aparecerÃ¡n aquellas urls a las que se pueda acceder desde la home utilizando enlaces Dofollow<br>&nbsp;<br>La visualizaciÃ³n de dicha arquitectura sirve para revisar si nuestra estrategia de enlazado interno se estÃ¡ efectuando correctamente, ya sea por temÃ¡ticas, por determinadas jerarquÃ­as, etc ...<br>&nbsp;<br>Bajo el grÃ¡fico tambiÃ©n se puede ver la lista de urls de tu sitio web, pudiendo seÃ±alar una de ellas en el grÃ¡fico (caso en que el nodo en cuestiÃ³n pasarÃ¡ a color negro con borde amarillo) o hacer click en el tÃ­tulo/url de la pÃ¡gina y entrar a ver mÃ¡s detalles sobre la misma.";
arrayTextos['174'] = "En esta secciÃ³n puedes encontrar un listado de videotutoriales que te permitirÃ¡n aprender a usar DinoRANK de una mejor forma";
arrayTextos['175'] = "DespuÃ©s de que Dinobot haya recorrido tu sitio web en esta secciÃ³n puedes ver una serie de elementos a tener en cuenta si queremos cuidar el seo on page de nuestro sitio web.<br>&nbsp;<br>AquÃ­ podremos revisar aquellas urls que tienen estados de tipo 404 y que por tanto no existen pero sin embargo estamos enlazando desde otras pÃ¡ginas internas. PÃ¡ginas con redirecciones 301 que ya no deberÃ­amos de estar enlazando directamente, o pÃ¡ginas con errores de servidor (tipo 500) que debemos de revisar si existen.<br>&nbsp;<br>AsÃ­mismo tambiÃ©n podremos ver aquellas pÃ¡ginas con titles, h1, metadescription, que estÃ¡n duplicados o directamente no existen, asÃ­ como las pÃ¡ginas en estado noindex.";
arrayTextos['176'] = "En esta secciÃ³n puedes medir de forma constante el posicionamiento de tu sitio web para las keywords que te interesa posicionar. Todos los dÃ­as analizaremos la posiciÃ³n de cada una de las keywords y la anotaremos para que la puedas consultar en una sencilla tabla. Indica las keywords a seguir haciendo click en el botÃ³n 'ConfiguraciÃ³n keywords'<br>&nbsp;<br>Haz click en el icono de la grÃ¡fica para ver una grÃ¡fica histÃ³rica con el posicionamiento de la keyword desde que empezamos a seguirla, o marca varias keywords con el check de la izquierda y haz click en el icono de la grÃ¡fica de una de ellas para ver la grÃ¡fica comparativa. TambiÃ©n puedes indicar anotaciones haciendo click en uno de los puntos de la grÃ¡fica, asÃ­ recordarÃ¡s cosas especÃ­ficas de determinados momentos de una keyword.<br>&nbsp;<br>En los casos en que encontremos una canibalizaciÃ³n, te lo indicaremos con el icono del canibal, y podrÃ¡s ver las urls que se canibalizan pulsando el botÃ³n 'Ver canibalizaciones'<br>&nbsp;<br>TambiÃ©n puedes definir tus alertas para que te avisemos el dÃ­a que una keyword supere una determinada posiciÃ³n o estÃ© por debajo de otra.";
arrayTextos['177'] = "Encuentra las palabras semÃ¡nticamente relacionadas y su proporciÃ³n para posicionar una keyword con nuestra fÃ³rmula WDF*DF. En esta secciÃ³n podrÃ¡s analizar las pÃ¡ginas web que estÃ¡n posicionado en los primeros resultados para la bÃºsqueda de una keyword concreta. Te indicaremos el listado de palabras mÃ¡s importantes que tienes que tener en cuenta al desarrollar tu contenido.<br>&nbsp;<br>Bajo la tabla de resultados podrÃ¡s ver la estructura de encabezados de dichas pÃ¡ginas, asÃ­ como su puntuaciÃ³n de prominencia para la keyword indicada en cada una de las urls.";
arrayTextos['178'] = "En esta secciÃ³n podrÃ¡s localizar aquellas pÃ¡ginas de tu sitio web que no estÃ¡n recibiendo trÃ¡fico orgÃ¡nico. Las pÃ¡ginas que no reciben trÃ¡fico orgÃ¡nico por regla general no estÃ¡n bien posicionadas en Google lo que puede indicar que el contenido de dichas pÃ¡ginas no es relevante a los ojos de Google. Aparte de ello su presencia puede afectar a la arquitectura interna asÃ­ como malgastar Crawl Budget, por lo que conviene gestionarlas ya sea generando contenido relevante, redireccionÃ¡ndolas a otras urls mÃ¡s relevantes para Google o directamente eliminÃ¡ndolas.";
arrayTextos['179'] = "Cuando mÃ¡s de una url de tu sitio web se posicionan para la bÃºsqueda de una sola keyword por regla general se estÃ¡n restando fuerza para posicionar dado que Google no tiene totalmente claro cual es la url que mejor responde a la intenciÃ³n del usuario, es decir: se estÃ¡n canibalizando.<br>&nbsp;<br>Gestionar las canibalizaciones es algo que suele funcionar bastante bien para mejorar el posicionamiento de aquellas keywords para las que estamos canibalizando.<br>&nbsp;<br>En Dinorank cruzamos los datos de Search Console para localizar canibalizaciones y no sÃ³lo te informamos sobre ellas, sino que te aconsejamos como proceder para resolverlas. Nunca hay que olvidar que los consejos no tienen en cuenta diversas circunstancias propias de cada web y que por tanto debemos de aplicar el sentido comÃºn antes de hacer caso a dichos consejos.";
arrayTextos['180'] = "En esta secciÃ³n puedes ver para que keywords estÃ¡n apareciendo urls de tu pÃ¡gina web, descubrir algunas que no conocÃ­as y encontrar oportunidades de mejora de posicionamiento.";
arrayTextos['181'] = "En esta secciÃ³n puedes acceder a la grÃ¡fica de visibilidad de cualquier dominio, grÃ¡fica que nos indicarÃ¡ el trÃ¡fico aproximado de los Ãºltimos meses.<br>&nbsp;<br>Aparte de la grÃ¡fica tambiÃ©n podemos encontrar las keywords que mÃ¡s trÃ¡fico envÃ­an a dicho dominio en base al trÃ¡fico estimado segÃºn su posicionamiento. Estas keywords nos aportarÃ¡n indicaciones claras sobre cual es la estrategia de posicionamiento del dominio indicado.";
arrayTextos['182'] = "En esta secciÃ³n podrÃ¡s llevar un seguimiento de tus enlaces externos. AgrÃ©ga la url en la que figura un enlace a tu sitio web y nosotros nos encargaremos de analizarla para incorporarlo a la base de datos de forma que puedas obtener estadÃ­sticas sobre proporciÃ³n de enlaces follow y no follow, anchor text usados, etc ... <br>&nbsp;<br>TambiÃ©n monitorizaremos el estado de los enlaces indicados para que si el enlace desaparece puedas actuar correspondientemente.";
arrayTextos['183'] = "Si tienes algÃºn problema relacionado con Dinorank, ya sea tÃ©cnico, de facturaciÃ³n, etc ... dÃ­noslo por aquÃ­ y nos pondremos a solucionarlo.";
arrayTextos['184'] = "En esta pÃ¡gina podrÃ¡s ver los principales datos de una url concreta del proyecto web, empezando por una grafica de enlazado interno, datos de title, estado de conexiÃ³n, distancia al a home, etc ... tablas de enlaces entrantes (especialmente Ãºtil para casos en que tenemos que localizar enlaces entrantes a una url) y salientes con indicaciÃ³n de la zona de la web en que se ubican (los casos en que se puede localizar segÃºn el marcado HTML) y datos de enlaces externos que apuntan a la url, segÃºn los enlaces indicados en la secciÃ³n 'GestiÃ³n de enlazado externo'.";
arrayTextos['185'] = "En esta secciÃ³n puedes encontrar nuevas keywords para tu sitio web, tan sÃ³lo tienes que indicar la keyword principal y seleccionar el pais y el idioma en que quieres posicionar tu contenido. El sistema te mostrarÃ¡ despuÃ©s los datos de volumen de bÃºsquedas (media mensual de bÃºsquedas para esa keyword exacta segÃºn Google), CPC (coste por click medio en Adwords) y Competencia (nivel de 0 a 1 de dificultad por competencia en Adwords segÃºn Google, aunque sea para Adwords da una idea aproximada para orgÃ¡nico) para dicha keyword. Aparte de dichos datos tambiÃ©n se mostrarÃ¡n los datos de tendencia con las bÃºsquedas por cada mes del aÃ±o, lo que sirve principalmente para ver estacionalidad, si la keyword se busca mÃ¡s en un momento u otro del aÃ±o.<br>&nbsp;<br>TambiÃ©n se ofrecerÃ¡n otras ideas de keywords a trabajar, tanto keywords long tail de la keyword indicada, como keywords relacionadas que segÃºn Google se relacionan semÃ¡nticamente aunque no contengan a la keyword original. Para dichas keywords se ofrecen tambiÃ©n los datos indicados anteriormente<br>&nbsp;<br>El mÃ¡ximo de keywords mostrado dependerÃ¡ del lÃ­mite segÃºn el producto contratado por el usuario, aunque habrÃ¡ ocasiones en que no se puedan ofrecer el total de resultados por no existir datos como casos en que no existan datos para una determinada keyword por usarse muy poco o nada.";
arrayTextos['186'] = "Los clicks a la home se calculan usando la mÃ­nima ruta entre pÃ¡ginas a travÃ©s sÃ³lo de enlaces Dofollow. En los casos en que se indica 'Indefinido' se debe a que no existe una ruta desde la home en que todos los enlaces sean Dofollow, para llegar a dicha url, o bien que dicha ruta es demasiado larga en clicks y no hemos podido localizarla.";
arrayTextos['187'] = "Felicidades, ya has puesto a DinoRANK a funcionar.";
arrayTextos['188'] = "A continuaciÃ³n y para finalizar, vamos a hacerte un rÃ¡pido resumen de las principales secciones de la herramienta. Una vez termines o cierres este resumen no se volverÃ¡ a mostrar mÃ¡s.<br>&nbsp;<br>Pulsa el botÃ³n 'Siguiente' para continuar.";
arrayTextos['189'] = "Siguiente";
arrayTextos['190'] = "En la secciÃ³n 'Soporte' puedes comunicar problemas tÃ©cnicos, de facturaciÃ³n o de cualquier Ã­ndole.";
arrayTextos['191'] = "AtrÃ¡s";
arrayTextos['192'] = "En la secciÃ³n 'Tutoriales' puedes ver tutoriales en vÃ­deo de cada secciÃ³n de DinoRANK que te facilitarÃ¡n extraer el 100% de la potencia.";
arrayTextos['193'] = "En la zona de usuario puedes ver todos tus proyectos web, dar de alta nuevos proyectos, revisar tus datos, cambiar tu clave o descargar tus facturas.";
arrayTextos['194'] = "AquÃ­ puedes agregar los dominios de tus proyectos web para trackear sus keywords, rastrear, etc ... TambiÃ©n podrÃ¡s cambiar de un proyecto a otro cuando tengas proyectos aÃ±adidos.";
arrayTextos['195'] = "AquÃ­ puedes aÃ±adir las keywords que quieres monitorizar y te diremos en quÃ© posiciÃ³n estÃ¡n cada dÃ­a pudiendo monitorizar para PC o mÃ³vil, ver grÃ¡ficas de evoluciÃ³n, analizar la evoluciÃ³n del top 20, poner alarmas, etc ...";
arrayTextos['196'] = "AquÃ­ puedes analizar el Pagerank interno de cada url de tu sitio web.<br>&nbsp;<br>DinoRANK rastrea tu web analizando cuanta 'fuerza' (Pagerank interno) recibe cada url y asÃ­ puedes optimizar los enlaces recibidos por cada una de ellas (que puedes ver haciendo click en la url del listado) para aumentar su fuerza si lo necesitas.<br>&nbsp;<br>TambiÃ©n te indicamos la profundidad de clicks desde la home a la que estÃ¡ cada url porque no es lÃ³gico que haya que hacer muchos clicks para llegar a un contenido importante.";
arrayTextos['197'] = "AquÃ­ puedes ver la estructura que tiene tu sitio web segÃºn las dependencias que marca tu arquitectura de enlazado interno. <br>&nbsp;<br>PodrÃ¡s ver cÃ³mo se agrupan los contenidos segÃºn la temÃ¡tica si estÃ¡n enlazados desde los mismos sitios y aquellos contenidos que se encuentren muy lejos de la home de la web.";
arrayTextos['198'] = "Tras haber rastreado tu sitio web DinoRANK te mostrarÃ¡ una auditorÃ­a en la que podrÃ¡s ver cuales son los errores principales que puedes tener en tu web.<br>&nbsp;<br>&nbsp;<br>PodrÃ¡s comprobar los estados de las urls, si tienes Titles, H1 o Metadescription repetidas, detectar las urls lentas, controlar Urls espejo, etc ...";
arrayTextos['199'] = "Esta secciÃ³n te dirÃ¡ cuales son las palabras y tÃ©rminos de 2 y 3 palabras que tienes que utilizar en tus textos para posicionar determinadas keywords en base a aquellos resultados que mejor posicionan.<br>&nbsp;<br>Google cada vez es mÃ¡s semÃ¡ntico y ya no basta con poner la keyword sino que hay que aportar un contexto en el contenido que aporte significado mediante el uso de LSI (palabras semÃ¡nticamente relacionadas).<br>&nbsp;<br>TambiÃ©n te ofrecemos una muestra de los encabezados de las urls que mejor posicionan la keyword para que puedas analizar de un vistazo lo trabajada que estÃ¡ dicha keyword y la intenciÃ³n de bÃºsqueda a la que estÃ¡n orientadas.";
arrayTextos['200'] = "En esta secciÃ³n podrÃ¡s encontrar canibalizaciones localizadas tras procesar datos de tu cuenta de Google.<br>&nbsp;<br>Sincroniza DinoRANK con tu cuenta de Search Console y podrÃ¡s localizar canibalizaciones que no sabÃ­as que existÃ­an. AdemÃ¡s te daremos consejos para resolverlas y mejorar tu posicionamiento.";
arrayTextos['201'] = "Sincroniza DinoRANK con tu cuenta de Google Analytics y localiza aquellas urls que no obtienen nada de trÃ¡fico orgÃ¡nico para que puedas mejorar su contenido y hacerlas relevantes a Google, o eliminarlas.";
arrayTextos['202'] = "En esta secciÃ³n podrÃ¡s agregar los enlaces externos que apuntan a tu sitio web. DinoRANK los analizarÃ¡ y crearÃ¡ una estadÃ­stica en la que podrÃ¡s observar tu perfil de link building para que el mismo sea lo mÃ¡s natural posible y evitar penalizaciones de Google.<br>&nbsp;<br>AdemÃ¡s tambiÃ©n monitorizaremos dichos enlaces y si alguno desaparece te avisaremos.";
arrayTextos['203'] = "AquÃ­ puedes obtener datos de volumen de bÃºsquedas, CPC y competencia para las keywords que quieras posicionar. TambiÃ©n te daremos una lista de derivadas long tail y keywords relacionadas para que puedas elegir otras opciones que puedan ser mÃ¡s interesantes o incorporar otras keywords para posicionar con el mismo contenido.";
arrayTextos['204'] = "En la secciÃ³n TrÃ¡fico orgÃ¡nico descubrirÃ¡s keywords que tu sitio web estÃ¡ posicionando y quizÃ¡ no sabÃ­as.<br>&nbsp;<br>En el caso de que DinoRANK encuentre alguna oportunidad clara para subir el posicionamiento de alguna keyword interesante, te lo indicaremos con algunos consejos.";
arrayTextos['205'] = "En esta secciÃ³n podrÃ¡s consultar los datos de visibilidad de cualquier dominio respecto a un pais y te mostraremos una grÃ¡fica con el trÃ¡fico orgÃ¡nico aproximado de dicho dominio durante los Ãºltimos 6 meses, asÃ­ como tambiÃ©n una lista de las principales keywords que llevan trÃ¡fico a dicho dominio.";
arrayTextos['206'] = "Â¡Ya estÃ¡s listo!";
arrayTextos['207'] = "El resumen ha finalizado y estÃ¡s listo para empezar a usar DinoRANK.";
arrayTextos['208'] = "Â¡Â¡Hagamos SEO DinoRANKer!!";
arrayTextos['209'] = "Es necesario indicar una direccion completa correcta de cara a la facturaciÃ³n";
arrayTextos['210'] = "Es necesario indicar la fecha de inicio";
arrayTextos['211'] = "Es necesario indicar la fecha de fin";
arrayTextos['212'] = "TUTORIALES";
arrayTextos['213'] = "USUARIO";
arrayTextos['214'] = "PROYECTOS";
arrayTextos['215'] = "TRACKING DE POSICIONES";
arrayTextos['216'] = "PAGERANK INTERNO";
arrayTextos['217'] = "ENLAZADO INTERNO";
arrayTextos['218'] = "AUDITORIA SEO ON PAGE";
arrayTextos['219'] = "WDF*DF Y PROMINENCIA";
arrayTextos['220'] = "CANIBALIZACIONES";
arrayTextos['221'] = "DETECCION DE THIN CONTENT";
arrayTextos['222'] = "GESTION DE ENLAZADO EXTERNO";
arrayTextos['223'] = "KEYWORD RESEARCH";
arrayTextos['224'] = "TRAFICO ORGANICO";
arrayTextos['225'] = "VISIBILIDAD";
arrayTextos['226'] = "SOPORTE";
arrayTextos['227'] = "En esta secciÃ³n podrÃ¡s ver, a travÃ©s del servicio gratuito de Backlinkshitter, quÃ© enlaces externos estÃ¡n apuntando a un determinado dominio o url.";
arrayTextos['228'] = "Â¿Realizar anÃ¡lisis?";
arrayTextos['229'] = "Contratar";
arrayTextos['230'] = "Encuesta";
arrayTextos['231'] = "Los datos son correctos";
arrayTextos['232'] = "Los datos indicados NO SON CORRECTOS";
arrayTextos['233'] = "Es muy importante configurar correctamente tu proyecto para extraer todo el potencial de DinoRANK";
arrayTextos['234'] = "Esta ventana no se volverÃ¡ a mostrar, Â¿estÃ¡s seguro?";
arrayTextos['235'] = "Es necesario indicar un nombre correcto";
arrayTextos['236'] = "La keyword se ha agrupado correctamente";
arrayTextos['237'] = "Keyword agrupada";
arrayTextos['238'] = "Keyword desagrupada";
arrayTextos['239'] = "La keyword se ha desvinculado del grupo";
arrayTextos['240'] = "La keyword serÃ¡ desvinculada de su grupo actual";
arrayTextos['241'] = "La keyword se desvincularÃ¡, Â¿estÃ¡s seguro?";
arrayTextos['242'] = "Keyword agrupada";
arrayTextos['243'] = "Es necesario indicar un paÃ­s del listado";
arrayTextos['244'] = "Es necesario indicar un idioma del listado";
arrayTextos['245'] = "Empezar";
arrayTextos['246'] = "AquÃ­ tienes el listado de todos tus proyectos web en DinoRANK, con un pequeÃ±o resumen sobre la evoluciÃ³n de tus keywords";
arrayTextos['247'] = "Cancelar cuenta";
arrayTextos['248'] = "Es necesario indicar un motivo";
arrayTextos['249'] = "Â¿Dar de baja la suscripciÃ³n?";
arrayTextos['250'] = "No ha sido posible cancelar la suscripciÃ³n. Contacta con soporte";
arrayTextos['251'] = "SuscripciÃ³n cancelada";
arrayTextos['252'] = "Tu suscripciÃ³n a DinoRANK ha sido cancelada";
arrayTextos['253'] = "Contratar plan superior";
arrayTextos['254'] = "Tu suscripciÃ³n a DinoRANK va a ser modificada cambiando al plan indicado";
arrayTextos['255'] = "Es necesario indicar el plan al que quieres cambiar";
arrayTextos['256'] = "Cambio correcto";
arrayTextos['257'] = "CERRAR";
arrayTextos['258'] = "Â¿Eliminar AnÃ¡lisis?";
arrayTextos['259'] = "El anÃ¡lisis se eliminarÃ¡ para siempre Â¿EstÃ¡s seguro?";
arrayTextos['260'] = "AnÃ¡lisis eliminado";
arrayTextos['261'] = "El anÃ¡lisis se ha eliminado correctamente";
arrayTextos['262'] = "AnÃ¡lisis no eliminado";
arrayTextos['263'] = "El anÃ¡lisis no se ha podido eliminar correctamente, si deseas eliminarlo, crÃ©anos un ticket a travÃ©s de soporte, disculpe las molestias.";
arrayTextos['264'] = "Guardado correctamente";
arrayTextos['265'] = "La palabras a omitir en el anÃ¡lisis se han guardado correctamente.";
arrayTextos['266'] = "No es posible realizar el anÃ¡lisis de backlinks.";
arrayTextos['267'] = "Para poder realizar anÃ¡lisis backlinks debes mejorar tu plan.";
arrayTextos['268'] = "Es necesario indicar un asunto";
arrayTextos['269'] = "Creada correctamente";
arrayTextos['270'] = "La tarea se ha creado correctamente";
arrayTextos['271'] = "La subtarea se ha creado correctamente";
arrayTextos['272'] = "Es un gestor de tareas, para poder crear tus tareas y subtareas para cada uno de tus proyectos.";
arrayTextos['273'] = "El estado se ha cambiado correctamente";
arrayTextos['274'] = "La fecha de fin se ha cambiado correctamente";
arrayTextos['275'] = "Cambiado correctamente";
arrayTextos['276'] = "Cambiar estado";
arrayTextos['277'] = "Â¿Estas seguro de cambiar el estado de la tarea?";
arrayTextos['278'] = "Guardado correctamente";
arrayTextos['279'] = "El informe se ha guardado correctamente, automatizaciÃ³n guardada con Ã©xito.";
arrayTextos['280'] = "Agregar nuevas keywords";
arrayTextos['281'] = "Competencia";
arrayTextos['282'] = "AÃ±adir proyecto";
arrayTextos['283'] = "Â¿QuÃ© es esta secciÃ³n?";
arrayTextos['284'] = "Â¿Eliminar informe?";
arrayTextos['285'] = "El informe automatizado se eliminarÃ¡ para siempre Â¿EstÃ¡s seguro?";
arrayTextos['286'] = "Informe eliminado";
arrayTextos['287'] = "El informe automatizado se ha eliminado correctamente";
arrayTextos['288'] = "Copiado con Ã©xito";
arrayTextos['289'] = "El enlace al tracking se ha copiado con Ã©xito";
arrayTextos['290'] = "Eliminar tarea";
arrayTextos['291'] = "Desea eliminar la tarea";
arrayTextos['292'] = "Tarea eliminada";
arrayTextos['293'] = "La tarea se ha eliminado correctamente";
arrayTextos['294'] = "Eliminar subtareas";
arrayTextos['295'] = "Â¿Desea eliminar las subtareas seleccionadas?";
arrayTextos['296'] = "La keyword asociada a la tarea se ha cambiado correctamente";
arrayTextos['297'] = "Selecciona al menos una keyword";
arrayTextos['298'] = "Selecciona al menos un cluster para agrupar";
arrayTextos['299'] = "Cerrar el ticket";
arrayTextos['300'] = "Si cierras esta incidencia, se darÃ¡ por resuelta y no se te contestarÃ¡ nada mÃ¡s, Â¿deseas continuar cerrÃ¡ndola?";
arrayTextos['301'] = "El archivo no contiene un formato correcto, selecciona un word, excel, pdf o imagen.";

function traduceTextos() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/traduceJS.php",
		data: "t=" + tiempo + "&arrayTextos=" + encodeURIComponent(JSON.stringify(arrayTextos)),
		success: function (msg) {
			arrayTextos = JSON.parse(msg);
		}
	})
}

traduceTextos();


function abreModal(title, body, urlBody, ancho, cierra = 'si') {
	if ($(".modal-arrow").length) {
		$(".modal-arrow").remove();
		$(".modal-dialog").css({ "position": "initial", "left": "initial", "top": "initial" });
		$(".modal-content").css({ "padding": "30px" });
		$(".btn-danger").css({ "display": "block" });
	}

	$('#modal-title').html(title);
	$('#modal-body').removeClass('tutorial');

	if (title != '') $("#modal-title").html(title);
	if (body != '') {
		$("#modal-body").html('<div class="modal-body-container">' + body + '</div>');
	} else if (urlBody != '') {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();
		$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
		$.ajax({
			type: "POST", url: urlBody,
			data: "t=" + tiempo,
			success: function (msg) {
				if (msg == 'activo') location.href = WEB_ROOT + "homed/";
				else if (msg == 'activo2') cargaContratar("2");
				else if (msg == 'contratar') cargaContratar();
				else if (msg == 'contratar2') cargaContratar("2");
				else $('#modal-body').html(msg);
			}
		})
	}
	if (cierra == 'no') $('#myModal').modal({ backdrop: 'static', keyboard: false });
	else $("#myModal").modal({ backdrop: 'dynamic', keyboard: true });

	if (ancho != '' && ancho != undefined) {
		$(".modal-dialog").css({
			"max-width": "95%",
			"width": ancho
		});
	}
}

function abreTutorial(codigo, modal_title = '') {

	if (codigo.substr(-4) == '.mp4') {
		var embedBody = "<video width='550' loop autoplay muted controls id='vid'><source type='video/mp4' src='https://dinorank.com/blog/videos/" + codigo + "'></source>ERROR</video><script>document.getElementById('vid').play();</script>";
	} else if (isNaN(codigo)) {
		var embedBody = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + codigo + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
	} else {
		var embedBody = '<iframe src="https://player.vimeo.com/video/' + codigo + '?title=0&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
	}

	$('#modal-title').html(modal_title);

	$('#modal-body')
		.addClass('tutorial')
		.html(embedBody);

	$("#myModal").modal();
	$(".modal-dialog").css("width", "650px");

}

function csvTracking() {
	var ids = '';
	for (i = 1; i <= $('#contador').val(); i++) {
		if ($('#checkK' + i).prop('checked')) {
			ids += "," + $('#checkK' + i).val();
		}
	}
	ids = ids.substring(1);
	console.log(WEB_ROOT + "csvt/?ids=" + ids);
	location.href = WEB_ROOT + "csvt/?ids=" + ids;
}

function enlaceDescarga(url, capa) {
	var codHtml = $("#" + capa).innerHTML;
	//$("#"+capa).html("<div style='text-align:center;'><img src='"+WEB_ROOT+"img/loading.gif' width='100'></div>");	
	location.href = url;
	//$("#"+capa).html(codHtml);	
}

function marcaCheck(clase) {

	var clase_fuente = ($('#selectorFuente').length && $('#selectorFuente').val() !== 'todos') ?
		'.' + $('#selectorFuente').val() : '';

	if (!$('#cabecera' + clase).is(':checked')) {
		$('.' + clase + clase_fuente).prop('checked', false);
	} else {
		$('.' + clase + clase_fuente).prop('checked', true);
	}
}


function sweet(title, texto, type = 'success', timer = 3000) {
	swal({
		title,
		text: texto,
		type,
		timer
	});
}

function login(nombreUsuario, clave, permanecer, elemento) {

	if (nombreUsuario == "") {
		sweet(arrayTextos['3'], arrayTextos['10'], "warning", 4000);
		/*
		swal({ 
			title: arrayTextos['3'],
			text: arrayTextos['10'],
			type: "warning",
			timer: 5000
		});
		*/
		return false;
	}
	if (clave == "") {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['11'],
			type: "warning",
			timer: 5000
		});
		return false;
	}

	//$("#modal-body").html("<div style='text-align:center;'><img src='"+WEB_ROOT+"img/loading.gif' width='100'></div>");
	const html_previous = $(".main-wrapper").html();
	$('.main-wrapper').html('');
	$("main").prepend("<div id='loading-login' style='display: flex; justify-content: center; align-items: center; min-height: 60vh;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");


	$.ajax({
		type: "POST",
		url: WEB_ROOT + "ajax/login.php",
		data: {
			nombreUsuario,
			clave,
			permanecer,
			elemento
		},
		success: function (msg) {

			const data = JSON.parse(msg);

			$('#loading-login').remove();

			switch (data.status) {

				case 'activo':
					location.href = data.message;
					break;

				case 'revisa-paypal':
					revisaPagoPaypal(data.message);
					break;

				case 'no-activo':
					$('.main-wrapper').addClass('no-grid')
						.html(data.message);
					break;

				case 'login-ko':
					$('.main-wrapper').html(html_previous);
					sweet(data.alert_title, data.message, "warning", 4000);
					break;
			}

		}
	})
}

function agregaKOnboarding(keyword, idTr) {
	if ($("textarea#keyword").val().trim() == '') $("textarea#keyword").val(keyword + "\n");
	else $("textarea#keyword").val($("textarea#keyword").val().trim() + "\n" + keyword + "\n");
	$("tr#tr" + idTr).remove();
}


function sugerenciasKeywords() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#sugerenciasKeywords").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/sugerenciasKeywords.php",
		data: "t=" + tiempo,
		success: function (msg) {
			$('#sugerenciasKeywords').html(msg);
		}
	})
}


function destacarKeyword(keywordId, valor) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/destacarKeyword.php",
		data: "t=" + tiempo + "&keywordId=" + keywordId + "&valor=" + valor,
		success: function (msg) {
			if (msg == "ERROR") {
				swal({
					title: arrayTextos['3'],
					text: arrayTextos['12'],
					type: "warning",
					timer: 5000
				});
				return false;
			} else {
				if (msg == 'si') {
					$('#starSi' + keywordId).show();
					$('#starNo' + keywordId).hide();
					$('#tr' + keywordId).addClass('estrellado');
					$('#tr' + keywordId).removeClass('noestrella');
				} else if (msg == 'no') {
					$('#starNo' + keywordId).show();
					$('#starSi' + keywordId).hide();
					$('#tr' + keywordId).addClass('noestrella');
					$('#tr' + keywordId).removeClass('estrellado');
				}
			}
		}
	})
}

function contacto() {
	email = $('#dirContacto').val();
	texto = $('#textoContacto').val();
	if (email == '') {
		swal({
			title: arrayTextos['13'],
			text: arrayTextos['14'],
			type: "warning",
			timer: 5000
		});
		return false;
	} else if (!validaEmail(email)) {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['16'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (texto == '') {
		swal({
			title: arrayTextos['13'],
			text: arrayTextos['17'],
			type: "warning",
			timer: 5000
		});
		return false;
	}
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/contacto.php",
		data: "t=" + tiempo + "&email=" + email + "&texto=" + texto,
		success: function (msg) {
			$("#modal-body").html("");
			if (msg == 'ok') {
				swal({
					title: arrayTextos['18'],
					text: arrayTextos['19'],
					type: "success",
					timer: 5000
				});
			} else {
				swal({
					title: arrayTextos['3'],
					text: arrayTextos['20'],
					type: "warning",
					timer: 5000
				});
			}
		}
	})
}

function backlinkshitter() {

	const current_project = $('#current_project').val();
	const url = $('#urlBacklinks').val();

	if (url == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['228'],
			type: "warning",
			timer: 5000
		});
		return false;
	}

	const type = url.substr(0, 4) == 'http' ? "page_backlinks" : "domain_backlinks";

	const is_from_domain = url.includes(current_project);

	dataLayer.push({
		'event': 'externalLinkingUrlChecked',
		'isFromDomain': is_from_domain
	});


	window.open("https://backlinkshitter.com/?url=" + encodeURIComponent(url) + "&type=" + type, '_blank');
}


function registrarse1(email, password, password2, elemento) {

	const check_privacy_policy = $('#aceptoPrivacidad').is(':checked');

	if (email == '') {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['22'],
			type: "warning",
			timer: 5000
		});
		return false;
	} else if (!validaEmail(email)) {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['23'],
			type: "warning",
			timer: 5000
		});
		return false;
	} else if (password == '') {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['24'],
			type: "warning",
			timer: 5000
		});
		return false;
	} else if (password != password2) {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['25'],
			type: "warning",
			timer: 5000
		});
		return false;
	} else if (!check_privacy_policy) {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['21'],
			type: "warning",
			timer: 5000
		});
		return false;
	}

	//var nowtime = new Date();
	//var tiempo = nowtime.getTime();
	//$("#modal-body").html("<div style='text-align:center;'><img src='"+WEB_ROOT+"img/loading.gif' width='100'></div>");

	$('#register-user').prop('disabled', true)
		.html('<i class="fa fa-spin fa-spinner"></i> &nbsp;Espere, por favor...');


	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/registro1.php",
		data: "email=" + email + "&clave=" + password + "&elemento=" + elemento,
		success: function (msg) {

			const data = JSON.parse(msg);

			if (data.status === 'ok') {
				dataLayer.push({
					'event': 'newRegistration',
					'buttonId': 'register-user'
				});
			}

			//$('#modal-body').html( data.message );
			if (data.status === 'ok') {
				$('.main-wrapper').addClass('no-grid')
					.html(data.message);
			} else {
				$('#user-register-form').prepend(data.message);
				$('#register-user').prop('disabled', false)
					.html('Registrarse <img src="' + WEB_ROOT + 'img/iconos/arrow-right-white.svg" />');

				setTimeout("$('.alert.alert-danger').slideUp()", 5000);
			}

		}
	});
}


function registroAfiliados(nombre, email, password, password2) {
	if (!$('#aceptoPrivacidad').is(':checked')) {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['21'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (email == '') {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['22'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (!validaEmail(email)) {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['23'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (password == '') {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['24'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (password != password2) {
		swal({
			title: arrayTextos['15'],
			text: arrayTextos['25'],
			type: "warning",
			timer: 3000
		});
		return false;
	}
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/registroAfiliados.php",
		data: "t=" + tiempo + "&nombre=" + nombre + "&email=" + email + "&clave=" + password,
		success: function (msg) {
			if (msg.substring(0, 2) == "ok") {
				swal({
					title: arrayTextos['15'],
					text: msg.substring(2),
					type: "success",
					timer: 1500
				}, function () {
					$('#myModal').modal('hide');
					location.reload();
				});
			} else {
				swal({
					title: arrayTextos['15'],
					text: msg,
					type: "warning",
					timer: 5000
				});
				$('#myModal').modal('hide');
			}
		}
	})
}




function cargaContratar(elemento) {
	if (elemento == '2') abreModal(arrayTextos['229'], "", WEB_ROOT + "views/contratar2.php");
	else abreModal(arrayTextos['229'], "", WEB_ROOT + "views/contratar.php");
}

function cargaUpgrade(idProducto) {
	abreModal(arrayTextos['229'], "", WEB_ROOT + "views/upgrade.php?idProducto=" + idProducto);
}

function muestraEncuesta() {
	$('#interiorCabecera').addClass("blur");
	$('#contenedorInterior').addClass("blur");
	abreModal(arrayTextos['230'], "", WEB_ROOT + "views/encuesta.php", "80%", "no");
	$(".close").css({ "display": "none" });
	$(".modal-header").html("");
	$(".modal-header").css({ "height": "8px", "padding": "0px" });
	$('#myModal').modal({ backdrop: 'static', keyboard: false });
}

function enviaEncuesta(modo) {
	var como = $('input[name="como"]:checked').val();
	var tipo = $('input[name="tipo"]:checked').val();

	if (!como && !tipo) {
		if (modo != 'vacio') {
			swal({
				title: arrayTextos['12'],
				text: arrayTextos['2901'],
				type: "warning",
				timer: 10000
			});
			return false;
		}
	}

	if (como == undefined) {
		if (modo != 'vacio') {
			swal({
				title: arrayTextos['26'],
				text: arrayTextos['27'],
				type: "warning",
				timer: 3000
			});
			return false;
		}
	}
	if (tipo == undefined) {
		if (modo != 'vacio') {
			swal({
				title: arrayTextos['28'],
				text: arrayTextos['29'],
				type: "warning",
				timer: 3000
			});
			return false;
		}
	}
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/encuesta.php",
		data: "t=" + tiempo + "&modo=" + modo + "&tipo=" + tipo + "&como=" + como,
		success: function (msg) {
			if (msg == 'vacio') {
				swal({
					title: arrayTextos['30'],
					text: arrayTextos['31'],
					type: "success",
					timer: 1000
				});
				//$('#myModal').modal('hide');
			} else {

				//$('#myModal').modal('hide');
			}
			onboardingPasos('dominio');
		}
	})
}

function bloqueaEncuesta() {
	swal({
		title: arrayTextos['33'],
		text: arrayTextos['34'],
		icon: "warning",
		buttons: [
			arrayTextos['35'],
			arrayTextos['36']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['37'],
		cancelButtonText: arrayTextos['38'],
		dangerMode: true
	}, function (isConfirm) { if (isConfirm) { enviaEncuesta("vacio"); } });
}


function cambiaContratar() {
	$('#enlaceAcceder').attr('href', "javascript:cargaContratar();");
}

/*
function marcaProducto(productoId, procede){
	if (procede=='click' && document.getElementById('codPromo') && $('#codPromo').val()!='' && !$('input:radio[name=idProducto]').filter('[value='+productoId+']').prop('checked')){
		$('#codPromo').val("");
		$('#forma_pago').show();
		swal({ 
			title: arrayTextos['39'],
			text: arrayTextos['40'],
			type: "warning",
			timer: 3000
		});			
	}  	
	$('input:radio[name=idProducto]').filter('[value='+productoId+']').prop('checked', true);
	completoPagar("notexto");	
}
*/

function registrarse(idProducto, modal) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "views/login.php",
		data: "t=" + tiempo + "&idProducto=" + idProducto + "&zona=registro",
		success: function (msg) {
			if (msg == 'activo') location.href = WEB_ROOT + "homed/";
			else if (msg == 'contratar') cargaContratar();
			else {
				$('#modal-title').html("Registrarse");
				$('#modal-body').html(msg);
				if (modal == 1) $("#myModal").modal();
			}
		}
	})
}

function cargaMasUrls(pag, ambito) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#loadingMas").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cargaMasUrls.php",
		data: "t=" + tiempo + "&pagina=" + pag + "&ambito=" + ambito,
		success: function (msg) {
			$('table#listaPagerank tr:last').after(msg);
			$("#loadingMas").html("");
			if ($('table#listaPagerank tr').length - 1 >= $('#numUrls').val()) $('#divBotonMas').html("");
			pagina = pagina + 1;
		}
	})
}

function validaEmail(email) {
	emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (emailRegex.test(email)) return true;
	else return false;
}

function olvido(email) {

	if (email == '') {
		swal({
			title: arrayTextos['41'],
			text: arrayTextos['42'],
			type: "warning",
			timer: 3000
		});
		return false;
	}

	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/olvido.php",
		data: "email=" + email,
		success: function (msg) {

			$('#modal-body').html(msg);

		}
	})

}

function revisaParametrosPaypal() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/revisaParametrosPaypal.php",
		data: "t=" + tiempo,
		success: function (msg) {
			var data = msg.split("#");
			if (data[0] != '') $('#a3').val(data[0]);
			if (data[1] != '') $('#p3').val(data[1]);
			if (data[2] != '') $('#t3').val(data[2]);

			add_datalayer();

			$('#formPayPal').submit();
		}
	})
}

jQuery.loadScript = function (url, callback) {
	jQuery.ajax({
		url: url,
		dataType: 'script',
		success: callback,
		async: true
	});
}

function revisaPagoPaypal(idUsuario) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/revisaPagoPaypal.php",
		data: "t=" + tiempo + "&idUsuario=" + idUsuario,
		success: function (msg) {
			if (msg == 'ok') {
				swal({
					title: arrayTextos['43'],
					text: arrayTextos['44'],
					type: "success",
					timer: 3000
				}, function () {
					errorCobro = false;
					location.href = 'https://dinorank.com/homed/';
				});
			} else {
				swal({
					title: arrayTextos['45'],
					text: arrayTextos['46'],
					type: "warning",
					timer: 20000
				});
				errorCobro = true;
				$('#enlaceAcceder').attr('href', "javascript:revisaPagoPaypal(" + idUsuario + ");");
			}
		}
	})
}

function cargaGraficoPagerank(num) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#cargaGrafico").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cargaGraficoPagerank.php",
		data: "t=" + tiempo + "&num=" + num,
		success: function (msg) {
			$('.botonGrafico').hide();
			$('#cargaGrafico').html(msg);
		}
	})
}

function cargaGraficoArquitectura(num) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#cargaGrafico").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cargaGraficoArquitectura.php",
		data: "t=" + tiempo + "&num=" + num,
		success: function (msg) {
			$('.botonGrafico').hide();
			$('#cargaGrafico').html(msg);
		}
	})
}

function olvidoClave() {

	$('#divLogin').hide();
	$('#forgot-password-form').show();

}

function cierraSesion() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cierra.php",
		data: "t=" + tiempo,
		success: function (msg) {
			location.href = msg;
		}
	})
}

function ff() {
	cierraSesion();
}

function restablece(id, clave, repite, cadena) {
	if (clave == '') {
		swal({
			title: arrayTextos['41'],
			text: arrayTextos['47'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (clave != repite) {
		swal({
			title: arrayTextos['41'],
			text: arrayTextos['48'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();
		$("#restablece").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/restablece.php",
			data: "t=" + tiempo + "&id=" + id + "&clave=" + clave + "&cadena=" + cadena,
			success: function (msg) {
				$('#restablece').html(msg);
			}
		})
	}

}

function despliegaRepliega(id) {
	if ($('#repliega' + id).css('display') == 'none') {
		$('#despliega' + id).hide();
		$('#repliega' + id).show();
		$('.trGrupo' + id).show();
	} else {
		$('#despliega' + id).show();
		$('#repliega' + id).hide();
		$('.trGrupo' + id).hide();
	}
}

function graficaGrupo(id, nombreCluster, media = 0) {
	$('.checkTracking').prop("checked", false);
	$('.checkGrupo' + id).prop("checked", true);
	$('#nombreCluster').val(nombreCluster);
	muestraGrafica("", "", "si", media);
	$('.checkGrupo' + id).prop("checked", false);
}

function restableceAfiliado(id, clave, repite, cadena, procedencia) {
	if (clave == '') {
		swal({
			title: arrayTextos['41'],
			text: arrayTextos['47'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (clave != repite) {
		swal({
			title: arrayTextos['41'],
			text: arrayTextos['48'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();
		$("#restablece").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/restableceAfiliado.php",
			data: "t=" + tiempo + "&id=" + id + "&clave=" + clave + "&cadena=" + cadena + "&procedencia=" + procedencia,
			success: function (msg) {
				if (procedencia != 'acceso') $('#restablece').html(msg);
				else {
					if (msg == 1) {
						swal({
							title: arrayTextos['41'],
							text: arrayTextos['65'],
							type: "success",
							timer: 3000
						});
					} else {
						swal({
							title: arrayTextos['41'],
							text: arrayTextos['68'],
							type: "warning",
							timer: 3000
						});
					}
				}
			}
		})
	}

}

/*
function completoPagar(opcion){
	
	if ( $('#codPromo').val() != '' && opcion != 'texto' ) {
		return false;
	}

	if ( $('input[name=idProducto]:checked').val() == 5 ) {
		$('#formTPV').html("<input type='button' value='Activar acceso de prueba' onClick='javascript:activaPrueba("+$('#idUsuario').val()+");'>");
	} else {
		if (
			$('input[name=idProducto]:checked').val()>0 && 
			$('#nombre').val()!='' && 
			$('#direccion').val()!='' && 
			$('#nif').val()!='' && 
			$('#ciudad').val()!='' &&
			$('#pais').val()!='' && 
			$('#formaPago').val()!='' 
		) {
			pagar($('#idUsuario').val(), $('input[name=idProducto]:checked').val(), $('#nombre').val(), $('#direccion').val(), $('#nif').val(), $('#pais').val(), $('#formaPago').val(), $('#ciudad').val(), $('#codPromo').val());
		}
			
		else if (opcion=='texto') {
			swal({ 
				title: arrayTextos['15'],
				text: arrayTextos['49'],
				type: "warning",
				timer: 3000
			});			
			return false;		
		}
	}
}
*/

function check_all_visible_keywords_tf() {
	const is_checked = $('#cabeceraCheckKResearch').is(':checked');
	if (is_checked) {
		$('.checkTF').each(function (e) {
			const is_visible = $(this).parent().parent().is(':visible');

			if (is_visible) {
				$(this).prop('checked', true);
			}

		});

	} else {
		$('.checkTF').prop('checked', false);

	}


}

function copiarPortapapeles(nombre, contador) {

	var copyText = '';
	for (i = 1; i <= $('#' + contador).val(); i++) {
		if ($('#' + nombre + i).prop('checked')) {
			copyText = copyText + "\n" + $('#keywordCopy' + i).val();
		}
	}
	var textArea = document.createElement("textarea");

	textArea.value = copyText;
	document.body.appendChild(textArea);
	textArea.select();
	try {
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		swal({
			title: arrayTextos['50'],
			text: arrayTextos['51'],
			type: "success",
			timer: 3000
		});
	} catch (err) {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['52'],
			type: "success",
			timer: 3000
		});
	}

	document.body.removeChild(textArea);

}

function copiarAlPortapapelesenlace(cadena) {

	// Crea un campo de texto "oculto"
	var aux = document.createElement("input");

	// Asigna el contenido del elemento especificado al valor del campo
	aux.setAttribute("value", cadena);

	// AÃ±ade el campo a la pÃ¡gina
	document.body.appendChild(aux);

	// Selecciona el contenido del campo
	aux.select();

	// Copia el texto seleccionado
	document.execCommand("copy");

	// Elimina el campo de la pÃ¡gina
	document.body.removeChild(aux);
	swal({
		title: arrayTextos['288'],
		text: arrayTextos['289'],
		type: "success",
		timer: 3000
	});

}

function goToByScroll(id) {
	var posicion = $('#' + id).offset().top;
	$('html,body').animate({ scrollTop: posicion }, 'slow');
}



function eliminaSite(id) {

	swal({
		title: arrayTextos['77'],
		text: arrayTextos['78'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	},
		function (isConfirm) {

			if (isConfirm) {

				var nowtime = new Date();
				var tiempo = nowtime.getTime();
				$.ajax({
					type: "POST", url: WEB_ROOT + "ajax/eliminaDominio.php",
					data: "t=" + tiempo + "&id=" + id,
					success: function (msg) {

						const data = JSON.parse(msg);

						if (data.status === 'ok') {

							dataLayer.push({
								'event': 'projectDeleted',
								'country': data.country,
								'language': data.language,
								'dateAdded': data.date_added,
								'keywordsCount': data.total_keywords
							});

							sweet(arrayTextos['153'], arrayTextos['154'], "success", 3000);

							location.reload();

						} else {

							sweet(arrayTextos['3'], arrayTextos['155'], "warning", 3000);

						}
					}
				});
			}
		});
}

function upgrade(idUsuario) {
	idProducto = $('input[name="productoContratar"]:checked').val();
	if (idProducto == undefined) {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['255'],
			type: "warning",
			timer: 3000
		});
		return false;
	}
	swal({
		title: arrayTextos['253'],
		text: arrayTextos['254'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	},
		function (isConfirm) {

			if (isConfirm) {

				var nowtime = new Date();
				var tiempo = nowtime.getTime();
				$("#upgradeProductos").html("<div style='text-align:center;width:100%;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
				$.ajax({
					type: "POST", url: WEB_ROOT + "ajax/upgrade.php",
					data: "t=" + tiempo + "&idProducto=" + idProducto,
					success: function (msg) {

						const data = JSON.parse(msg);

						if (data.status === 'ERROR') {
							swal({
								title: arrayTextos['3'],
								text: data.message,
								type: "warning",
								timer: 3000
							});
						} else {
							swal({
								title: arrayTextos['256'],
								text: data.message,
								type: "success",
								timer: 15000
							});
							$("#myModal").modal();
							ga('send', 'event', { 'eventCategory': 'Upgrade', 'eventAction': idProducto, 'eventLabel': idUsuario });
						}
					}
				});
			}
		});
}


function cambiaProyecto(id) {
	document.getElementById("selectProyecto").value = id;
	seleccionProyecto(id);
}


function activatodosproyectos() {
	const collection = document.getElementsByClassName("select-options");
	for (let i = 0; i < collection.length; i++) {
		var collectionh = collection[i].children;
		for (let j = 0; j < collectionh.length; j++) {
			collectionh[j].style.display = 'block';
		}
	}
	document.getElementById('inputSelectorProyecto').focus();
	document.getElementById('inputSelectorProyecto').value = '';
}

function cierraselectorproyecyos() {
	var className = $('.custom-select').attr('class');
	if (className.indexOf('open') > 0) {
		$('.custom-select').click();
	}
}

function buscaproyectosseleccionar() {
	var className = $('.custom-select').attr('class');
	if (className.indexOf("open") <= 0) {
		$('.custom-select').click();
	}
	var cadena = document.getElementById('inputSelectorProyecto').value;
	const collection = document.getElementsByClassName("select-options");
	for (let i = 0; i < collection.length; i++) {
		var collectionh = collection[i].children;
		for (let j = 0; j < collectionh.length; j++) {
			var stringdomi = collectionh[j].innerHTML;
			stringdomi = stringdomi.substr(stringdomi.indexOf('<strong class="color-green">') + 18);
			stringdomi = stringdomi.substr(1, stringdomi.indexOf('</strong>'));
			if (stringdomi.indexOf(cadena) > 0 || cadena == '') {
				collectionh[j].style.display = 'block';
			} else {
				collectionh[j].style.display = 'none';
			}
		}
		collection[i].style.display = "block";
	}

}
/*
function buscaproyectosseleccionar1() {
	var cadena=document.getElementById('inputSelectorProyecto').value;
	$.ajax({
		type: "POST",
		url: WEB_ROOT + "ajax/buscaproyectosseleccionar.php",
		data: "cadena=" + cadena,
		success: function (msg) {
			document.getElementById('opcionesproyecto').innerHTML=msg;
			const collection = document.getElementsByClassName("custom-select");
			for (let i = 0; i < collection.length; i++) {
				collection[i].click();
			  
			}
			
			
		}
	})
}*/

function seleccionProyecto(id) {

	if (id == '-1') {
		location.href = WEB_ROOT + "usuario/#nuevo_proyecto";
		return;
	}

	var htmlAnt = $("#menuSelectProyecto").html();
	$("#menuSelectProyecto").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");

	var nowtime = new Date();

	var tiempo = nowtime.getTime();

	$.ajax({
		type: "POST",
		url: WEB_ROOT + "ajax/seleccionaProyecto.php",
		data: "t=" + tiempo + "&id=" + id,
		success: function (msg) {
			if (id > 0) {
				if (msg == 'ok') {
					location.href = WEB_ROOT + "home";
					//setTimeout( location.reload(), 10000 );
					/*
					swal({
						title: arrayTextos['81'],
						text: arrayTextos['82'],
						type: "success",
						timer: 10000
					});
							*/
				} else {
					swal({
						title: arrayTextos['3'],
						text: arrayTextos['83'],
						type: "warning",
						timer: 30000
					});
				}
			}
			$("#menuSelectProyecto").html(htmlAnt);
		}
	})
}

function eliminaKeyword(keyword, id) {
	swal({
		title: arrayTextos['86'],
		text: arrayTextos['87'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {

		if (isConfirm) {

			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/eliminarKeyword.php",
				data: "t=" + tiempo + "&id=" + id,
				success: function (msg) {
					if (msg == 'ok') {
						var nowtime = new Date();
						var tiempo = nowtime.getTime();
						$.ajax({
							type: "POST", url: WEB_ROOT + "ajax/tablaTrackingConfig.php",
							data: "t=" + tiempo,
							success: function (msg) {
								$('#tablaKeywords').html(msg);
							}
						})
						sweet(arrayTextos['162'], arrayTextos['163'], "success", 3000);
					} else if (msg == 'nosite') sweet(arrayTextos['3'], arrayTextos['164'], "warning", 3000);
					else sweet(arrayTextos['3'], arrayTextos['165'], "warning", 3000);
				}
			})

		}
	});

}


function cargaTrackingPaginado(limite, fechaIni, fechaFin) {
	document.getElementById('mostrarmas').style.display = 'none';
	$.ajax({
		type: "POST",
		url: WEB_ROOT + "ajax/cargaTrackingPaginado.php",
		data: "limite=" + limite + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin,
		success: function (msg) {
			$('#tablaTracking').find('tbody').append(msg);
		}
	})
}


function eliminaKeywordTracking() {

	var cadenaIds = '';

	for (var i = 1; i <= $('#contador').val(); i++) {
		if ($('#checkK' + i).prop('checked')) {
			cadenaIds = cadenaIds + ',' + $('#checkK' + i).val();
		}
	}
	if (cadenaIds == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['88'],
			type: "warning",
			timer: 3000
		});
		return false;
	}
	swal({
		title: arrayTextos['89'],
		text: arrayTextos['90'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {

		if (isConfirm) {

			var nowtime = new Date();
			var tiempo = nowtime.getTime();

			$.ajax({
				type: "POST",
				url: WEB_ROOT + "ajax/eliminarKeyword.php",
				data: "t=" + tiempo + "&id=" + cadenaIds,
				success: function (msg) {
					if (msg == 'ok') {
						for (i = 1; i <= $('#contador').val(); i++) {
							if ($('#checkK' + i).prop('checked')) {
								$('tr#tr' + $('#checkK' + i).val()).hide();
							}
						}
						sweet(arrayTextos['166'], arrayTextos['167'], "success", 3000);
						setTimeout('location.reload()', 2000);
					} else if (msg == 'nosite') {
						sweet(arrayTextos['3'], arrayTextos['168'], "warning", 3000);
					} else {
						sweet(arrayTextos['3'], arrayTextos['169'], "warning", 3000);
					}
				}
			})

		}
	});

}

function muestraCanibalizacion(id) {
	if (document.getElementById(id).style.display == 'block') document.getElementById(id).style.display = 'none';
	else document.getElementById(id).style.display = 'block';
}

function muestraGrafica(id, tiempo, muestraModal, media = '0') {
	cadenaIds = id;
	if (tiempo == '') fechaIni = $('#fechaIni').val();
	fechaFin = $('#fechaFin').val();
	if (id == '') nombreCluster = $('#nombreCluster').val();
	else nombreCluster = '';
	for (i = 1; i <= $('#contador').val(); i++) {
		if ($('#checkK' + i).prop('checked') && $('#checkK' + i).val() != id) cadenaIds = cadenaIds + ',' + $('#checkK' + i).val();
	}
	if (cadenaIds.substring(0, 1) == ',') cadenaIds = cadenaIds.substring(1);

	if (muestraModal == 'si') $("#myModal").modal();

	var nowtime = new Date();
	var t = nowtime.getTime();
	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/keywordGrafica.php",
		data: "t=" + t + "&cadenaIds=" + cadenaIds + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin + "&tiempo=" + tiempo + "&nombreCluster=" + nombreCluster + "&media=" + media,
		success: function (msg) {
			var data = msg.split("#*#");
			$('#modal-body').html(data[1]);
			$("#modal-title").html(data[0]);
		}
	})
}


function guardaGrafica(id, tiempo, muestraModal, media = '0') {
	cadenaIds = id;
	if (tiempo == '') fechaIni = $('#fechainicio').val();
	fechaFin = $('#fechafin').val();
	if (id == '') nombreCluster = $('#nombreCluster').val();
	else nombreCluster = '';
	for (i = 1; i <= $('#contador').val(); i++) {
		//	if ($('#checkK' + i).prop('checked') && $('#checkK' + i).val() != id) cadenaIds = cadenaIds + ',' + $('#checkK' + i).val();
	}
	//if (cadenaIds.substring(0, 1) == ',') cadenaIds = cadenaIds.substring(1);

	if (muestraModal == 'si') $("#myModal").modal();
	var nowtime = new Date();
	var t = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/keywordGraficaGuardar.php",
		data: "t=" + t + "&cadenaIds=" + cadenaIds + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin + "&tiempo=" + tiempo + "&nombreCluster=" + nombreCluster + "&media=" + media,
		success: function (msg) {
			var data = msg.split("#*#");
			$('#modal-body').html(data[1]);
			$("#modal-title").html(data[0]);
		}
	})
}

function muestraCompetencia(id, num) {
	$("#myModal").modal();
	var nowtime = new Date();
	var t = nowtime.getTime();
	const modal_title = locale === 'es_ES' ? 'GrÃ¡ficas de la competencia' : __['GrÃ¡ficas de la competencia'];
	$('#modal-title').html(modal_title);
	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/tracking/competenciaGrafica.php",
		data: "t=" + t + "&id=" + id + "&num=" + num,
		success: function (msg) {
			if (msg) {
				$('#modal-body').html(msg);
			} else {

				const no_competencia = `
				<div class="modal-body-container">
					<p class="alert alert-warning"><i class="fa fa-warning"></i> No hay datos suficientes todavÃ­a</p>
				</div>
				`;

				$('#modal-body').html(no_competencia);
			}
		}
	})
}

function concursoSeo(id) {
	var nowtime = new Date();
	var t = nowtime.getTime();
	$("#divConcurso").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/tracking/competenciaGrafica.php",
		data: "t=" + t + "&id=" + id,
		success: function (msg) {
			$('#divConcurso').html(msg);
		}
	})
}

function muestraGraficaPeq(id, id2) {

	const browser_width = $(window).width();
	const ancho = browser_width <= 600 ? 'auto' : '60px';
	const fechaIni = $('#fechaIni').val();
	const fechaFin = $('#fechaFin').val();

	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/keywordGrafica.php",
		data: {
			cadenaIds: id,
			ancho,
			alto: '30px',
			id2,
			fechaIni,
			fechaFin,
		},
		success: function (msg) {
			$('#grafica' + id2).html(msg);
			$(".modal-dialog").css("max-width", "1000px");
			$(".modal-dialog").css("width", "100%");
		}
	})
}

function buscaAcademy() {

	const texto = $('#buscarAcademy').val();
	const perfil = $('#perfil').val();
	const tag = $('#tags').val();

	$("#listaCursos").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/buscaAcademy.php",
		data: {
			texto: texto,
			perfil: perfil,
			tag: tag,
		},
		success: function (msg) {
			$("#listaCursos").html(msg);
		}
	})
}

function controlGraficaMedia() {
	var borrar = new Array();
	posicionI = window.pageYOffset + window.innerHeight;
	partes.forEach(function (valor, indice, array) {
		if (valor < posicionI) {
			muestraGraficaMedia(indice);
			borrar.push(indice);
		}
	});
	borrar.forEach(function (valor, indice, array) {
		delete (partes[valor]);
	});
}

function muestraGraficaMedia(siteId) {

	const browser_width = $(window).width();
	const ancho = browser_width <= 600 ? 'auto' : '60px';

	$("#graficaMediaTracking" + siteId).html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/graficaMedia.php",
		data: {
			siteId: siteId,
		},
		success: function (msg) {
			$("#graficaMediaTracking" + siteId).html(msg);
		}
	})

}





async function buscaKeyword(orden, dir) {
	keyword = $('#buscaKeyword').val();
	modo = $('#modo').val();
	if (orden == '') orden = $('#orden').val();
	//$("#tablaK").fadeOut("slow");
	//await sleep(300);
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#tablaK").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/buscaKeyword.php",
		data: "t=" + tiempo + "&keyword=" + keyword + "&orden=" + orden + "&dir=" + dir + "&modo=" + modo,
		success: function (msg) {
			$('#tablaK').html(msg);
			$('#ttip').remove();
			//$("#tablaK").fadeIn("slow");
		}
	})
}

function filtraTracking(fechaIni, fechaFin) {

	const keyword = $('#buscaKeyword').val();
	const start_date = convert_string_to_date(fechaIni);
	const end_date = convert_string_to_date(fechaFin);

	if (fechaIni === '' || fechaFin === '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['132'],
			type: "warning",
			timer: 3000
		});
		return false;
	}

	if (start_date > end_date) {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['133'],
			type: "warning",
			timer: 3000
		});
		return false;
	}


	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#tablaK").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/filtraTracking.php",
		data: "t=" + tiempo + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin + "&keyword=" + keyword,
		success: function (msg) {
			$('#tablaK').html(msg);
			$('#ttip').remove();
			//$("#tablaK").fadeIn("slow");
		}
	})
}

function agregaAlerta() {
	alertaKeyword = $('#alertaKeyword').val();
	alertaComparador = $('#alertaComparador').val();
	alertaPosicion = $('#alertaPosicion').val();
	if (alertaKeyword == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['91'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (alertaComparador == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['92'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else if (alertaPosicion == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['93'],
			type: "warning",
			timer: 3000
		});
		return false;
	}
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/agregaAlerta.php",
		data: "t=" + tiempo + "&keyword=" + alertaKeyword + "&comparador=" + alertaComparador + "&posicion=" + alertaPosicion,
		success: function (msg) {
			if (msg == 'ok') {
				muestraAlertas();
				swal({
					title: arrayTextos['94'],
					text: arrayTextos['95'],
					type: "success",
					timer: 3000
				});
			} else {
				swal({
					title: arrayTextos['3'],
					text: msg,
					type: "warning",
					timer: 3000
				});
			}
		}
	})
}

function muestraAlertas() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#tablaAlertas").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/alertas.php",
		data: "t=" + tiempo,
		success: function (msg) {
			$('#tablaAlertas').html(msg);
		}
	})
}



focoLogin = false;
focoBuscaTrack = false;
focoBuscaUrls = false;

function onTecla(e) {
	var tecla = e ? e.keyCode : event.keyCode;
	if (tecla == '13' && focoLogin) document.getElementById('botonLogin').click();
	if (tecla == '13' && focoBuscaTrack) document.getElementById('botonBuscaTrack').click();
	if (tecla == '13' && focoBuscaUrls) document.getElementById('botonBuscaUrls').click();
}

function eliminarAlerta(id, keyword) {
	swal({
		title: arrayTextos['96'],
		text: arrayTextos['97'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {

		if (isConfirm) {
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/eliminarAlerta.php",
				data: "t=" + tiempo + "&id=" + id,
				success: function (msg) {
					if (msg == 'ok') {
						muestraAlertas();
						swal({
							title: arrayTextos['98'],
							text: arrayTextos['99'],
							type: "success",
							timer: 3000
						});
					} else {
						swal({
							title: arrayTextos['3'],
							text: msg,
							type: "warning",
							timer: 3000
						});
					}

				}
			})
		}
	});
}

function agregaNota() {
	idPos = $("#idPos").val();
	nota = $("#nuevaNota").val();
	if (nota == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['100'],
			type: "warning",
			timer: 3000
		});
		return false;
	}
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#myModal2 #modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/agregaNota.php",
		data: "t=" + tiempo + "&nota=" + nota + "&idPos=" + idPos,
		success: function (msg) {
			if (msg == 'ok') {
				muestraAlertas();
				swal({
					title: arrayTextos['101'],
					text: arrayTextos['102'],
					type: "success",
					timer: 3000
				});
			} else {
				swal({
					title: arrayTextos['3'],
					text: arrayTextos['103'],
					type: "warning",
					timer: 3000
				});
			}
			muestraNotas(idPos);
		}
	})
}

function mostrarConsejos(id) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	var datos = $('#datos' + id).val();
	var keyword = $('#keyword' + id).val();
	if (document.getElementById('ocultarConsejos' + id).style.display == 'none') {
		document.getElementById('verConsejos' + id).style.display = 'none';
		document.getElementById('ocultarConsejos' + id).style.display = 'block';
		mostrarCapa('consejos' + id);
		$("#consejos" + id).html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/canibalizacionesConsejos.php",
			data: "t=" + id + "&keyword=" + keyword + "&datos=" + datos,
			success: function (msg) {
				$('#consejos' + id).html(msg);

			}
		})
	} else {
		mostrarCapa('consejos' + id);
		document.getElementById('verConsejos' + id).style.display = 'block';
		document.getElementById('ocultarConsejos' + id).style.display = 'none';
	}
}

function eliminarNota(idNota, idPos) {
	swal({
		title: arrayTextos['104'],
		text: arrayTextos['105'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {

		if (isConfirm) {
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$("#myModal2 #modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/eliminarNota.php",
				data: "t=" + tiempo + "&idNota=" + idNota,
				success: function (msg) {
					muestraNotas(idPos);
					if (msg == 'ok') {
						swal({
							title: arrayTextos['106'],
							text: arrayTextos['107'],
							type: "success",
							timer: 3000
						});
					} else {
						swal({
							title: arrayTextos['3'],
							text: arrayTextos['108'],
							type: "warning",
							timer: 3000
						});
					}
				}
			})
		}
	});
}

function compruebaextension(id,numero){
	if(document.getElementById('archivo'+numero+id).files[0].name.indexOf('.xls') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.XLS') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.CSV') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.csv') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.pdf') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.png') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.jpg') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.jpeg') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('doc') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.gif') > 0 ||document.getElementById('archivo'+numero+id).files[0].name.indexOf('.PDF') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.PNG') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.JPG') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.JPEG') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('DOC') > 0 || document.getElementById('archivo'+numero+id).files[0].name.indexOf('.GIF') > 0){
		document.getElementById('labelarchivo'+numero+id).innerHTML=document.getElementById('archivo'+numero+id).files[0].name;
		document.getElementById('labelarchivo'+numero+id).classList.remove('button');
		document.getElementById('labelarchivo'+numero+id).style.color='#509c87';
		document.getElementById('labelarchivo'+numero+id).style.fontWeight ='inherit';
		document.getElementById('labelarchivo'+numero+id).style.fontSize='14px';
		if(numero<3){
			document.getElementById('labelarchivo'+(numero+1)+id).style.display='flex';
		}
	}else{
		alert(arrayTextos['301']);
	}
}

function muestraNotas(id) {
	if (id.indexOf('/') > 0) var cadena = "&keywordPosicionId=" + id;
	else var cadena = "&idPos=" + id;
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#myModal2 #modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/keywordNotas.php",
		data: "t=" + tiempo + cadena,
		success: function (msg) {
			$('#myModal2 #modal-body').html(msg);
		}
	})
}

function ajustaAfilSesion() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/ajustaAfilSesion.php",
		data: "t=" + tiempo,
		success: function (msg) {

		}
	})
}


function cierraFranjaVerde(ambito) {
	swal({
		title: arrayTextos['109'],
		text: arrayTextos['110'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['111'],
		cancelButtonText: arrayTextos['112'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/cierraFranjaVerde.php",
				data: "t=" + tiempo + "&ambito=" + ambito,
				success: function (msg) {
					$("#franjaVerde").fadeOut("slow");
				}
			})
		}
	});
}


function comienzaScraping(modo) {
	if (modo != 'onboarding') {
		swal(
			{
				title: arrayTextos['113'],
				text: arrayTextos['114'],
				icon: "warning",
				buttons: [
					arrayTextos['36'],
					arrayTextos['35']
				],
				showCancelButton: true,
				confirmButtonText: arrayTextos['79'],
				cancelButtonText: arrayTextos['80'],
				dangerMode: true
			},
			function (isConfirm) {

				if (isConfirm) {

					const noSub = $('#noSubdominios').is(':checked') ? 1 : 0;
					const project_id = $('#start-scraping').data('project-id');

					dataLayer.push({
						'event': 'manualCrawlStarted',
						'projectId': project_id
					});

					var nowtime = new Date();
					var tiempo = nowtime.getTime();

					$.ajax({
						type: "POST", url: WEB_ROOT + "ajax/comienzaScraping.php",
						data: "t=" + tiempo + "&noSub=" + noSub,
						success: function (msg) {
							msg = msg.trim();
							if (msg == 'ok') {
								swal({
									title: arrayTextos['115'],
									text: arrayTextos['116'],
									type: "success",
									timer: 3000
								}, function () {
									if (modo == 'onboarding') {
										//onboardingPasos('sincroniza');
										$('#interiorCabecera').addClass("blur");
										$('#contenedorInterior').addClass("blur");
										location.href = WEB_ROOT + 'keyword-research/?d=1';
									} else location.reload();
								});
							} else if (msg == 'existe') {
								swal({
									title: arrayTextos['3'],
									text: arrayTextos['117'],
									type: "warning",
									timer: 3000
								});
							} else {
								swal({
									title: arrayTextos['3'],
									text: arrayTextos['118'],
									type: "warning",
									timer: 3000
								});
							}
						}
					});
				}
			}
		);
	} else {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();

		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/comienzaScraping.php",
			data: "t=" + tiempo,
			success: function (msg) {
				msg = msg.trim();
				if (msg == 'ok') {
					$('#interiorCabecera').removeClass("blur");
					$('#contenedorInterior').removeClass("blur");
					location.href = WEB_ROOT + 'keyword-research/?d=1';
				}
			}
		});
	}
}

async function scrapingEnCursoOld() {
	while ($("#finalizado").val() == 0) {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/scrapingEnCurso.php",
			data: "t=" + tiempo,
			async: false,
			success: function (msg) {
				msg = msg.trim();
				if (msg == 'fin') {
					$("#finalizado").val("1");
					swal({
						title: arrayTextos['119'],
						text: arrayTextos['120'],
						type: "success",
						timer: 3000
					}, function () {
						location.reload();
					});
				} else {
					$("#enCurso").html(msg);
					$("#finalizado").val("0");
				}
			}
		})
		if ($("#finalizado").val() == 0) await sleep(1000);
	}
}

async function scrapingEnCurso() {
	var inicio = 0;
	var i = 0;
	var j = 0;
	while ($("#finalizado").val() == 0) {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/scrapingEnCurso.php",
			data: "t=" + tiempo + "&inicio=" + inicio,
			async: false,
			success: function (msg) {
				inicio = 1;
				msg = msg.trim();
				if (msg == 'fin') {
					$("#finalizado").val("1");
					swal({
						title: arrayTextos['119'],
						text: arrayTextos['120'],
						type: "success",
						timer: 3000
					}, function () {
						location.reload();
					});
				} else {

					var data = msg.split("#*#");
					if (data.length > 2) {

						var texto = data[0];
						var mensaje = data[1];
						var numUrls = data[2];
						if (j == 0) $("#enCurso").html(texto);
						else $("#enCurso").prepend(texto);
						$("#finalizado").val("0");
						if (mensaje != '.') $("#mensaje").html(mensaje);
						$("#numUrls").html(numUrls);
						j++;
					} else if (i == 0 || data.length == 2) {

						var mensaje = data[1];
						if (mensaje != '' && mensaje != '.') var texto = '';
						else var texto = data[0];
						$("#enCurso").html(texto);
						if (mensaje != '.') $("#mensaje").html(mensaje);
					} else {

						var mensaje = data[1];
						if (mensaje != '.') $("#mensaje").html(mensaje);
					}
				}
			}
		})
		i++;
		if ($("#finalizado").val() == 0) await sleep(500);
	}
}

function interrumpeScraper() {
	swal({
		title: arrayTextos['121'],
		text: arrayTextos['122'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {

		if (isConfirm) {
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/interrumpeScraping.php",
				data: "t=" + tiempo,
				success: function (msg) {
					if (msg == 'ok') {
						$("#finalizado").val("1");
						swal({
							title: arrayTextos['123'],
							text: arrayTextos['124'],
							type: "success",
							timer: 3000
						}, function () {
							location.reload();
						});
					} else {
						swal({
							title: arrayTextos['3'],
							text: arrayTextos['125'],
							type: "warning",
							timer: 3000
						});
					}
				}
			})
		}
	});
}

function csvK(id, contador) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	var cadIds = '';
	for (i = 1; i <= contador; i++) {
		if ($('#checkClip' + i).prop('checked')) {
			cadIds = cadIds + "-" + i;
		}
	}
	location.href = WEB_ROOT + "csvk/?t=" + tiempo + "&id=" + btoa(id) + "&cadIds=" + cadIds;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function listaPagerank(orden, tipo) {
	$('#listaUrls').fadeOut("fast");
	texto = $("#textoBuscar").val();

	if (orden == '') orden = "pagerank DESC";
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#listaUrls").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/pagerank.php",
		data: "t=" + tiempo + "&texto=" + texto + "&orden=" + orden + "&tipo=" + tipo,
		success: function (msg) {
			$('#listaUrls').html(msg);
			$('#listaUrls').fadeIn("slow");
		}
	})
}

function cargaN() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "nc.php",
		data: "t=" + tiempo,
		success: function (msg) {
			$('body').html(msg);
		}
	})
}

function canibalizacionesDashboard() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#moduloCanibalizaciones").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/canibDash.php",
		data: "t=" + tiempo,
		success: function (msg) {
			$('#moduloCanibalizaciones').html(msg);
		}
	})
}

function thinContentDashboard() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#moduloThin").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/thinDash.php",
		data: "t=" + tiempo,
		success: function (msg) {
			$('#moduloThin').html(msg);
		}
	})
}

function muestraGrafCol(i) {
	$('div.contGrafCol').hide();
	$('div#contCol' + i).show();
	$('.grafCol').removeClass('button-green');
	$('#grafCol' + i).toggleClass('button-green');
}

function audit(tipo, despues) {
	$('input[type="button"]').removeClass('botonVerde');
	if (tipo == 'estados') $('#onPageEstados').toggleClass('botonVerde');
	if (tipo == 'titles') $('#onPageTitles').toggleClass('botonVerde');
	if (tipo == 'h1') $('#onPageH1').toggleClass('botonVerde');
	if (tipo == 'noindex') $('#onPageNoindex').toggleClass('botonVerde');
	if (tipo == 'metarobots') $('#onPageMetarobots').toggleClass('botonVerde');
	if (tipo == 'meta') $('#onPageMeta').toggleClass('botonVerde');
	if (tipo == 'urlsLentas') $('#urlsLentas').toggleClass('botonVerde');
	if (tipo == 'ilinks') $('#onPageILinks').toggleClass('botonVerde');
	if (tipo == 'httpVsHttps') $('#httpVsHttps').toggleClass('botonVerde');
	if (tipo == 'urlsEspejo') $('#urlsEspejo').toggleClass('botonVerde');
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#divOnPage").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/seoonpage.php",
		data: "t=" + tiempo + "&tipo=" + tipo,
		success: function (msg) {
			$('#divOnPage').html(msg);
			if (despues != undefined) {
				auditDatos(tipo, despues);
				var y = $(window).scrollTop();
				$(window).scrollTop(y + 1000);
			}
		}
	})
}

function sugerirEnlaces(id) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#sugerenciasEnlaces").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/sugerirEnlaces.php",
		data: "t=" + tiempo + "&id=" + id,
		success: function (msg) {
			$('#sugerenciasEnlaces').html(msg);
		}
	})
}

function botonesTrafico(tipo) {
	$('input[type="button"]').removeClass('botonVerde');
	$('input#' + tipo).toggleClass('botonVerde');

	$('input[type="button"]').removeClass('auditButtonSelect');
	if (tipo == 'keywordsTraccionas') $('#keywordsTraccionas').toggleClass('auditButtonSelect');
	if (tipo == 'oportunidades') $('#oportunidades').toggleClass('auditButtonSelect');
	$('#capakeywordsTraccionas').hide();
	$('#capaoportunidades').hide();
	$('#capa' + tipo).show();
}

function auditDatos(tipo, subtipo, id) {
	$('.subOnPage').removeClass('botonVerde');
	$('#' + id).toggleClass('botonVerde');
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#datasubonpage").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/seoonpagedatos.php",
		data: "t=" + tiempo + "&tipo=" + tipo + "&subtipo=" + subtipo,
		success: function (msg) {
			$('#datasubonpage').html(msg);
		}
	})
}
function guardaPalabrasOmitirAnalisis(idsite) {
	var palabras_omitir_analisis = $('#input_palabras_omitir_analisis').val();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/guardaPalabrasOmitirAnalisis.php",
		data: "idsite=" + idsite + "&palabras_omitir_analisis=" + palabras_omitir_analisis,
		success: function (msg) {
			swal({
				title: arrayTextos['264'],
				text: arrayTextos['265'],
				type: "success",
				timer: 3000
			});
		}
	})
}

function repetirDensidadProminencia(keyword, url, repite) {
	if (repite == "si") {
		texto1 = arrayTextos['126'];
		texto2 = arrayTextos['127'];
	} else {
		texto1 = arrayTextos['228'];
		texto2 = "";
	}
	swal({
		title: texto1,
		text: texto2,
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true,
		closeOnConfirm: false
	}, function (isConfirm) {

		const project_id = $('#project-id').val();

		if (isConfirm) {

			allowed_short_keywords = ['tÃ©', 'te', 'fe'];

			if (keyword.length < 3 && !allowed_short_keywords.includes(keyword)) {
				swal(
					arrayTextos['3'],
					arrayTextos['128'],
					'warning'
				);
			} else {

				dataLayer.push({
					'event': 'wdfAnalysis',
					'projectId': project_id,
					'wdfKeyword': keyword,
					'wdfUrl': url ? 'yes' : 'no'
				});

				swal({
					title: arrayTextos['129'],
					text: '',
					type: 'success',
					timer: 2000
				}
				);

				textoEspera = $('#textoEspera').val();
				var nowtime = new Date();
				var tiempo = nowtime.getTime();
				$("#dataDensidad").html("<div style='padding:20px;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'><br>" + textoEspera + "</div>");
				$("#nuevoAnalisis").html("");
				window.scrollTo(0, 0);
				$.ajax({
					type: "POST",
					url: WEB_ROOT + "ajax/densidad.php",
					data: "t=" + tiempo + "&keyword=" + encodeURIComponent(keyword) + "&url=" + url + "&modo=nuevo",
					success: function (msg) {

						$('#dataDensidad').html(msg);
					}
				});
			}
		}
	});
}

function visibilidad() {
	dominio = $('#dominio').val();
	pais = $('#pais').val();
	dominiourl = document.getElementById('dominioourl').value;
	if (dominiourl == "url") {
		dominiourl = "url";
	} else {
		dominio = dominio.replace("https", "");
		dominio = dominio.replace("http", "");
		dominio = dominio.replace("://", "");
		dominio = dominio.replace("www.", "");
		dominio = dominio.trim();
		if (dominio.substring(dominio.length - 1) == '/') dominio = dominio.substring(0, dominio.length - 1);
		dominiourl = "dominio";
		if (!dominioValido(dominio)) {
			swal({
				title: arrayTextos['3'],
				text: arrayTextos['130'],
				type: "warning",
				timer: 3000
			});
			return false;
		}
	}
	if (pais == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['131'],
			type: "warning",
			timer: 3000
		});
		return false;
	}
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#datosVisibilidad").html("<br><img src='" + WEB_ROOT + "img/loading.gif' width='100'><br>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/visibilidad.php",
		data: "t=" + tiempo + "&dominio=" + dominio + "&pais=" + pais + "&dominiourl=" + dominiourl,
		success: function (msg) {

			dataLayer.push({
				'event': 'competitorsVisibility',
				'country': pais
			});

			$('#datosVisibilidad').html(msg);
		}
	})
}

function recuperaAnalisis(id) {
	textoEspera = $('#textoEspera').val();
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$('#nuevoAnalisis').hide();
	$("#dataDensidad").html("<img src='" + WEB_ROOT + "img/loading.gif' width='100'><br>" + textoEspera);
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/densidad.php",
		data: "t=" + tiempo + "&id=" + id + "&modo=recupera",
		success: function (msg) {
			$('.chincheta').remove();
			$('#densidadAnteriores').remove();
			$('#dataDensidad').html(msg);
		}
	})
}

function eliminarDensidadProminencia(id) {
	swal({
		title: arrayTextos['258'],
		text: arrayTextos['259'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/eliminadensidad.php",
				data: "id=" + id,
				success: function (msg) {
					if (msg == "eliminado") {
						swal({
							title: arrayTextos['260'],
							text: arrayTextos['261'],
							type: "success",
							timer: 3000
						});
						$('#fila' + id).remove();
					} else {
						swal({
							title: arrayTextos['262'],
							text: arrayTextos['263'],
							type: "warning",
							timer: 3000
						});
					}
				}
			})
		}
	});
}

function loadg(idDiv, texto) {
	$("#" + idDiv).html("<img src='" + WEB_ROOT + "img/loading.gif' width='100'><br>" + texto);

	const project_id = $('#sync-with-google').data('project-id');
	dataLayer.push({
		'event': 'analyticsSyncronization',
		'projectId': project_id
	});

}

function accesoGoogle() {

	heigthT = (window.innerHeight - 700) / 2;
	widthT = (window.innerWidth - 700) / 2;
	window.open(WEB_ROOT + "ajax/accesoGoogle.php", "_blank", "toolbar=no,scrollbars=no,resizable=no,top=" + heigthT + ",left=" + widthT + ",width=700,height=400");

	/*$('#modal-body').html("<iframe src='"+WEB_ROOT+"ajax/accesoGoogle.php' width='100%'></iframe>");
	$("#myModal").modal();*/

	/*var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#modal-body").html("<div style='text-align:center;'><img src='"+WEB_ROOT+"img/loading.gif' width='100'></div>");
	$.ajax( {
		type:"POST", url:WEB_ROOT+"ajax/accesoGoogle.php",
		data:"t="+tiempo,
		success: function (msg) {
			$('#modal-body').html(msg);
			$("#myModal").modal();
		}
	} )			*/
}

function agregaCadenaKeys() {
	cadenaKeys = $('input#cadenaKeys').val();
	$('textarea#keyword').val(cadenaKeys);
	$('#sugerenciasKeywords table').html("");
}
function mostrarCapaTabla(id) {
	if (document.getElementById(id).style.display == 'none') {
		$("#" + id).fadeIn("slow");
		setTimeout(function () { document.getElementById(id).style.display = 'table-row'; }, 600);
		document.getElementById('oculta'+id).style.display='inline';
		document.getElementById('muestra'+id).style.display='none';
	} else {
		$("#" + id).fadeOut("slow");
		setTimeout(function () { document.getElementById(id).style.display = 'none'; }, 600);
		document.getElementById('oculta'+id).style.display='none';
		document.getElementById('muestra'+id).style.display='inline';
	}
	//if (document.getElementById(id).style.display=='block') document.getElementById(id).style.display='none';
	//else document.getElementById(id).style.display='block';
}
function mostrarCapa(id) {
	if (document.getElementById(id).style.display == 'none') {
		$("#" + id).fadeIn("slow");
		setTimeout(function () { document.getElementById(id).style.display = 'block'; }, 600);
	} else {
		$("#" + id).fadeOut("slow");
		setTimeout(function () { document.getElementById(id).style.display = 'none'; }, 600);
	}
	//if (document.getElementById(id).style.display=='block') document.getElementById(id).style.display='none';
	//else document.getElementById(id).style.display='block';
}
function mostrarCapaconbotones(id) {
	if (document.getElementById(id).style.display == 'none') {
		document.getElementById(id + 'ocultar').style.display = 'block';
		document.getElementById(id + 'mostrar').style.display = 'none';
		$("#" + id).fadeIn("slow");
		setTimeout(function () { document.getElementById(id).style.display = 'block'; }, 600);
	} else {
		document.getElementById(id + 'ocultar').style.display = 'none';
		document.getElementById(id + 'mostrar').style.display = 'block';
		$("#" + id).fadeOut("slow");
		setTimeout(function () { document.getElementById(id).style.display = 'none'; }, 600);
	}
	//if (document.getElementById(id).style.display=='block') document.getElementById(id).style.display='none';
	//else document.getElementById(id).style.display='block';
}
function displayCapa(id) {
	if (document.getElementById(id).style.display == 'none') {
		$("#" + id).show();
	} else {
		$("#" + id).hide();
	}
}
function sess() {
	setTimeout(function () {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/sess.php",
			data: "t=" + tiempo,
			success: function (msg) {

			}
		})
		sess();
	}, 180000);

}

function trackingAgrupa(id) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/tracking/trackingAgrupa.php",
		data: "t=" + tiempo + "&id=" + id,
		success: function (msg) {
			$('#modal-body').html(msg);
			$("#myModal").modal();
			$('#modal-title').html("");
			$(".modal-dialog").css("max-width", "800px");
		}
	})
}

function trackingAgrupaEjecuta(id, grupoId) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/trackingAgrupaEjecuta.php",
		data: "t=" + tiempo + "&id=" + id + "&grupoId=" + grupoId,
		success: function (msg) {
			swal({
				title: arrayTextos['242'],
				text: arrayTextos['236'],
				type: "success",
				timer: 3000
			});
			$('#myModal').modal('hide');
			$('#botonBuscaTrack').click();
		}
	})
}


function trackingDesagrupaungrupo(id, idgrupo) {
	swal({
		title: arrayTextos['241'],
		text: arrayTextos['240'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/trackingDesagrupa.php",
				data: "t=" + tiempo + "&id=" + id + "&idgrupo=" + idgrupo,
				success: function (msg) {
					swal({
						title: arrayTextos['238'],
						text: arrayTextos['239'],
						type: "success",
						timer: 3000
					});
					$('#botonBuscaTrack').click();
				}
			})
		}
	})
}

function trackingDesagrupa(id) {
	swal({
		title: arrayTextos['241'],
		text: arrayTextos['240'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/trackingDesagrupa.php",
				data: "t=" + tiempo + "&id=" + id,
				success: function (msg) {
					swal({
						title: arrayTextos['238'],
						text: arrayTextos['239'],
						type: "success",
						timer: 3000
					});
					$('#botonBuscaTrack').click();
				}
			})
		}
	})
}

function videoVisto(id) {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/videoVisto.php",
			data: "t=" + tiempo + "&id=" + id,
			success: function (msg) {
				 $('#tituloVideo'+id+' .fa-check').css("visibility", "visible");
			}
		})

}

function desactivafiltrosinformeperiodo(id) {
	const collection = document.getElementsByClassName("filtroperiodo");
	for (let i = 0; i < collection.length; i++) {
		collection[i].classList.remove('white');
		collection[i].classList.remove('verde');
	}
	if (id != "NADA") {
		document.getElementById(id).classList.add('white');
		document.getElementById(id).classList.add('verde');
	}
}

function actualizatablakeywordtareasinforme() {
	var fechainicio = $("#fechainicio").val();
	var fechafin = $("#fechafin").val();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/actualizatablakeywordinforme.php",
		data: "fechafin=" + fechafin + "&fechainicio=" + fechainicio,
		success: function (msg) {
			document.getElementById('tablaK').innerHTML = msg;
			$('#cabeceraCheckTracking').prop('checked', true);
			mostrarCapaconbotones('tablaK');
			check_all_visible_keywords();
			$('#cabeceraChecktarea').click(function (e) {
				check_all_visible_tareas();
			});
			mostrarCapaconbotones('tablaK');
		}
	});
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/actualizatablatareasinforme.php",
		data: "fechafin=" + fechafin + "&fechainicio=" + fechainicio,
		success: function (msg) {
			document.getElementById('tablatareas').innerHTML = msg;
		}
	});

}





function buscaKeywords(modo) {
	if (modo == 'todas') texto = '';
	else texto = $('#texto').val();

	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#buscaKeywords").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/buscaKeywords.php",
		data: "t=" + tiempo + "&texto=" + texto + "&modo=" + modo,
		success: function (msg) {
			$('#buscaKeywords').html(msg);
		}
	})
}
function buscaThinContent() {
	const fechaIni = $('#fechaIni').val();
	const fechaFin = $('#fechaFin').val();

	const date_ini = convert_string_to_date(fechaIni);
	const date_fin = convert_string_to_date(fechaFin);

	if (!fechaIni || !fechaFin) {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['132'],
			type: "warning",
			timer: 3000
		});
		return false;
	}
	if (date_ini > date_fin) {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['133'],
			type: "warning",
			timer: 3000
		});
		return false;
	}

	$('.loading-gif').toggle();
	//$("#listadoThin").html("<div style='text-align:center;'><img src='"+WEB_ROOT+"img/loading.gif' width='100'></div>");

	$.ajax({
		type: "POST",
		url: WEB_ROOT + "ajax/buscaThinContent.php",
		data: {
			fechaIni,
			fechaFin,
		},
		success: function (msg) {

			// La resta entre date_fin y date_ini es devuelta en milisegundos entre ambas fechas
			const diff_days = (date_fin - date_ini) / 1000 / 60 / 60 / 24;

			dataLayer.push({
				'event': 'queryThinContent',
				'periodDays': diff_days
			});

			$('.loading-gif').toggle();
			$('#listadoThin').html(msg);
		}
	});
}

function cargaCanibalizaciones() {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$("#capaCanibalizaciones").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/canibalizaciones.php",
		data: "t=" + tiempo,
		success: function (msg) {
			$('#capaCanibalizaciones').html(msg);
		}
	})
}
var enviandoSoporte = false;

function enviaSoporte() {
	if (enviandoSoporte) return false;
	enviandoSoporte = true;
	tipo = $('#tipo').val();
	texto = encodeURIComponent($('#texto').val());
	if (tipo == '' || texto == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['134'],
			type: "warning",
			timer: 3000
		});
	}else{

	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	var formData = new FormData();
	formData.append('archivo1', document.getElementById('archivo1').files[0]);
	formData.append('archivo2', document.getElementById('archivo2').files[0]);
	formData.append('archivo3', document.getElementById('archivo3').files[0]);
	formData.append('tipo', tipo);
	formData.append('texto', texto);
	formData.append('t', tiempo);
	$("#abrirTicket").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/abrirSoporte.php",
		data: formData,
    mimeType: "multipart/form-data",
		processData: false,
		contentType: false,
		cache: false,
		success: function (msg) {
			if (msg.substr(0, 5) == 'ERROR') {
				swal({
					title: arrayTextos['3'],
					text: msg.substr(5),
					type: "warning",
					timer: 3000
				});
			} else {
				swal({
					title: arrayTextos['135'],
					text: msg,
					type: "success",
					timer: 3000
				}, function () {
					location.reload();
				});
			}
			enviandoSoporte = false;
		}
	})
	}
}
function enviaSoporteRespuesta(id) {
	if (enviandoSoporte) return false;
	enviandoSoporte = true;
	texto = encodeURIComponent($('#texto'+id).val());
	if(texto==""){
		texto = encodeURIComponent($('#respuesta'+id).val());
	}
	

	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	
	var formData = new FormData();
	formData.append('archivo1', document.getElementById('archivo1'+id).files[0]);
	formData.append('archivo2', document.getElementById('archivo2'+id).files[0]);
	formData.append('archivo3', document.getElementById('archivo3'+id).files[0]);
	formData.append('id', id);
	formData.append('texto', texto);
	formData.append('t', tiempo);
	$("#abrirTicket").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/enviarMensajeSoporte.php",
		data: formData,
		processData: false,
		contentType: false,
		success: function (msg) {
			if (msg.substr(0, 5) == 'ERROR') {
				swal({
					title: arrayTextos['3'],
					text: msg.substr(5),
					type: "warning",
					timer: 3000
				});
			} else {
				swal({
					title: arrayTextos['137'],
					text: msg,
					type: "success",
					timer: 2000
				}, function () {
					location.reload();
				});
			}
			enviandoSoporte = false;
		}
	})
}

function rTicketMensaje(id) {
	texto = encodeURIComponent($('#respuesta' + id).val());
	if (texto == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['136'],
			type: "warning",
			timer: 3000
		});
	}else{
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	var formData = new FormData();
	formData.append('archivo1', document.getElementById('archivo1'+id).files[0]);
	formData.append('archivo2', document.getElementById('archivo2'+id).files[0]);
	formData.append('archivo3', document.getElementById('archivo3'+id).files[0]);
	formData.append('id', id);
	formData.append('texto', texto);
	formData.append('t', tiempo);
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/rTicketMensaje.php",
		data: formData,
		processData: false,
		contentType: false,
		success: function (msg) {
			if (msg.substr(0, 5) == 'ERROR') {
				swal({
					title: arrayTextos['3'],
					text: msg.substr(5),
					type: "warning",
					timer: 3000
				});
			} else {
				swal({
					title: arrayTextos['137'],
					text: msg,
					type: "success",
					timer: 2000
				}, function () {
					location.reload();
				});
			}
		}
	});
	}
}

function rTicket(id) {
	texto = encodeURIComponent($('#respuesta' + id).val());
	/*if (texto == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['136'],
			type: "warning",
			timer: 3000
		});
	}*/
	swal({
		title: arrayTextos['299'],
		text: arrayTextos['300'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/rTicket.php",
				data: "t=" + tiempo + "&texto=" + texto + "&id=" + id,
				success: function (msg) {
					if (msg.substr(0, 5) == 'ERROR') {
						swal({
							title: arrayTextos['3'],
							text: msg.substr(5),
							type: "warning",
							timer: 3000
						});
					} else {
						swal({
							title: arrayTextos['137'],
							text: msg,
							type: "success",
							timer: 2000
						}, function () {
							location.reload();
						});
					}
				}
			})
		}
	})
}


function leerMensajeSoporte(id,leer){
	
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/leerMensajeSoporte.php",
		data: "id=" + id+ "&leer=" + leer,
		success: function (msg) {
			if(leer==1){
				document.getElementById('leer'+id).style.display='none';
				document.getElementById('noleido'+id).style.display='block';
				document.getElementById('estado'+id).innerHTML="Pendiente";
			}else{
				document.getElementById('estado'+id).innerHTML='<i class="fa fa-eye-slash" aria-hidden="true"></i> Pendiente';
				document.getElementById('leer'+id).style.display='block';
				document.getElementById('noleido'+id).style.display='none';
			}
		}
	})
}

function rTicketUsuario(id){
	swal({
		title: arrayTextos['299'],
		text: arrayTextos['300'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			texto = encodeURIComponent($('#texto' + id).val());
			var nowtime = new Date();
			var tiempo = nowtime.getTime();
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/rTicketUsuario.php",
				data: "t=" + tiempo + "&texto=" + texto + "&id=" + id,
				success: function (msg) {
					if (msg.substr(0, 5) == 'ERROR') {
						swal({
							title: arrayTextos['3'],
							text: msg.substr(5),
							type: "warning",
							timer: 3000
						});
					} else {
						swal({
							title: arrayTextos['137'],
							text: msg,
							type: "success",
							timer: 2000
						}, function () {
							location.reload();
						});
					}
				}
			})
	}
	})
}

function enprocesoTicket(id, texto) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/rTicketMensaje.php",
		data: "t=" + tiempo + "&texto=" + texto + "&id=" + id,
		success: function (msg) {
			if (msg.substr(0, 5) == 'ERROR') {
				swal({
					title: arrayTextos['3'],
					text: msg.substr(5),
					type: "warning",
					timer: 3000
				});
			} else {
				swal({
					title: arrayTextos['137'],
					text: msg,
					type: "success",
					timer: 2000
				}, function () {
					location.reload();
				});
			}
		}
	})
}


function anotaTestAB(accion) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/anotaTestAB.php",
		data: "t=" + tiempo + "&accion=" + accion,
		success: function (msg) {

		}
	})
}

var numSwitch = 0;
function switchPrecio() {
	numSwitch++;
	if (numSwitch == 2) {
		numSwitch = 0;
		return false;
	}
	if ($('#switchCheck').val() == 'ano') {
		$('#switchCheck').val("mes");
		muestra = "mes";
		oculta = "aÃ±o";
	} else {
		$('#switchCheck').val("ano");
		muestra = "aÃ±o";
		oculta = "mes";
	}

	$('.precio' + muestra).show();
	$('.precio' + oculta).hide();

}

var arrNodes = [];
function marcar(id) {

	//	arrNodes.forEach(desmarcar); 

	if ($('#idMarcado').val() != '') {
		var item = [];
		item["id"] = $('#idMarcado').val();
		desmarcar(item);
	}

	var a = document.getElementById("svgObject");

	var svgItem = a.getElementById(id);

	if (!arrNodes[id]) arrNodes[id] = [];
	arrNodes[id]['style'] = svgItem.getAttribute("style");
	arrNodes[id]['r'] = svgItem.getAttribute("r");
	arrNodes[id]['id'] = id;

	svgItem.setAttribute("style", "stroke:yellow;stroke-width:3px;");
	$('#idMarcado').val(id);
	location.href = '#canvas';
}

function desmarcar(item) {
	arrNodes.splice(item.id, 1);

	var a = document.getElementById("svgObject");
	var svgItem = a.getElementById(item.id);
	svgItem.setAttribute("style", item.style);
	svgItem.setAttribute("r", item.r);
}


function creartarea(site_id) {

	var nombre = $('#nombre').val();
	var fechafin = $('#fechafin').val();
	var observaciones = $('#observaciones').val();
	var keyword = $('#selectorkeyword').val();
	var prioridad = $('#selectorprioridad').val();

	if (nombre == "") {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['268'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else {
		$("#tareaspendientes").html("<div style='text-align:center;'><br><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/crearTarea.php",
			data: "nombre=" + nombre + "&fechafin=" + fechafin + "&keyword=" + keyword + "&prioridad=" + prioridad + "&site_id=" + site_id + "&observaciones=" + observaciones,
			success: function (msg) {
				if (msg.indexOf('rrorerrorerror') <= 0) {
					swal({
						title: arrayTextos['269'],
						text: arrayTextos['270'],
						type: "success",
						timer: 3000
					});
					document.getElementById('ordentareas').value = "";
					document.getElementById('contenidobuscar').value = "";
					document.getElementById('fechafinhasta').value = "";
					document.getElementById('filtroprioridad').value = "";
					$("#tareaspendientes").html(msg);
					$('#nombre').val("");
					$('#fechafin').val("");
					$('#observaciones').val("");
					$('#selectorkeyword').val("");
					$('.date-picker').datetimepicker({
						language: 'es',
						weekStart: 1,
						todayBtn: 1,
						autoclose: 1,
						todayHighlight: 1,
						startView: 2,
						minView: 2,
						forceParse: 0,
						format: 'dd/mm/yyyy'
					});
					refrescacontadortareas(site_id, "Pendiente");
					muestratareaspendientes();
					ocultarTareaModal();
					$("#gestorlistatareas").show();
				} else {
					swal({
						title: arrayTextos['3'],
						text: arrayTextos['12'],
						type: "error",
						timer: 3000
					});
				}
			}
		});
	}
}
function refrescatablatareasrealizadas(site_id, tipo) {
	var orden = document.getElementById('ordentareas').value;
	var filtroprioridad = document.getElementById('filtroprioridad').value;
	var contenidobuscar = document.getElementById('contenidobuscar').value;
	var fechafinhasta = document.getElementById('fechafinhasta').value;

	$("#tareasrealizadas").html("<div style='text-align:center;'><br><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/refrescatablatareasrealizadas.php",
		data: "site_id=" + site_id + "&contenidobuscar=" + contenidobuscar + "&fechafinhasta=" + fechafinhasta + "&tipo=" + tipo + "&orden=" + orden + "&filtroprioridad=" + filtroprioridad,
		success: function (msg) {
			if (tipo == "Realizada") {
				$("#tareasrealizadas").html(msg);
			} else if (tipo == "En proceso") {
				$("#tareasenproceso").html(msg);
			} else {
				$("#tareaspendientes").html(msg);
			}

			$('.date-picker').datetimepicker({
				language: 'es',
				weekStart: 1,
				todayBtn: 1,
				autoclose: 1,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				forceParse: 0,
				format: 'dd/mm/yyyy'
			});
		}
	});

}

function verdetalles(tarea_id) {

	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/muestraDetallesTarea.php",
		data: "tarea_id=" + tarea_id,
		success: function (msg) {
			$('#subfilatabla' + tarea_id).html(msg);
			$('#subfila' + tarea_id).show();
			$('#oculta' + tarea_id).show();
			$('#muestra' + tarea_id).hide();
		}
	});

}

function muestraeliminarsubtarea(tareaid, seleccionados) {
	document.getElementById('cuentaseleccioneliminar' + tareaid).innerHTML = "" + seleccionados + "";
	document.getElementById('borrar' + tareaid).style.display = 'block';
	document.getElementById('crear' + tareaid).style.display = 'none';
}
function ocultaeliminarsubtarea(tareaid) {
	document.getElementById('cuentaseleccioneliminar' + tareaid).innerHTML = "";
	document.getElementById('crear' + tareaid).style.display = 'block';
	document.getElementById('borrar' + tareaid).style.display = 'none';
}
function eliminasubtareas(tarea_id) {
	swal({
		title: arrayTextos['294'],
		text: arrayTextos['295'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			var cadena = "";
			$('.checksub' + tarea_id).each(function (e) {

				const is_visible = $(this).parent().parent().is(':visible');

				if (is_visible) {
					if ($(this).is(':checked')) {
						cadena = cadena + $(this).attr("id").substring(13) + ",";
					}
				}

			});
			if (cadena != "") {
				$.ajax({
					type: "POST", url: WEB_ROOT + "ajax/eliminasubtareas.php",
					data: "tarea_id=" + tarea_id + "&cadena=" + cadena,
					success: function (msg) {
						if (msg.indexOf('rrorerrorerror') <= 0) {
							ocultardetalles(tarea_id, '');
							verdetalles(tarea_id, '');
							ocultaeliminarsubtarea(tarea_id);
						} else {
							swal({
								title: arrayTextos['3'],
								text: arrayTextos['12'],
								type: "error",
								timer: 3000
							});
						}
					}
				});

			}
		}
	});
}

function muestrauocultasubtareaborrar(tareaid) {
	var cuenta = 0;
	$('.checksub' + tareaid).each(function (e) {

		const is_visible = $(this).parent().parent().is(':visible');

		if (is_visible) {
			if ($(this).is(':checked')) {
				cuenta = cuenta + 1;
			}
		}

	});
	if (cuenta > 0) {
		muestraeliminarsubtarea(tareaid, cuenta);
	} else {
		ocultaeliminarsubtarea(tareaid);
	}
}

function marcadesmarcachecksubtareas(tareaid) {
	const is_checked = $('#checksubtarea' + tareaid).is(':checked');
	var cuenta = 0;
	if (is_checked) {

		$('.checksub' + tareaid).each(function (e) {

			const is_visible = $(this).parent().parent().is(':visible');

			if (is_visible) {
				$(this).prop('checked', true);
				cuenta = cuenta + 1;
			}

		});
		muestraeliminarsubtarea(tareaid, cuenta);

	} else {

		$('.checksub' + tareaid).prop('checked', false);
		ocultaeliminarsubtarea(tareaid);
	}
}

function ocultardetalles(tarea_id) {
	$('#subfila' + tarea_id).hide();
	$('#oculta' + tarea_id).hide();
	$('#muestra' + tarea_id).show();
}
function cambiaestadosubtarea(tarea_id, subtarea_id, site_id) {
	estado = document.getElementById("estadosub" + subtarea_id).value;
	swal({
		title: arrayTextos['276'],
		text: arrayTextos['277'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['35'],
		cancelButtonText: arrayTextos['36'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/cambiaestadosubtarea.php",
				data: "subtarea_id=" + subtarea_id + "&estado=" + estado + "&tarea_id=" + tarea_id + "&site_id=" + site_id,
				success: function (msg) {
					if (msg.indexOf('rrorerrorerror') <= 0) {

						/*refrescatablatareasrealizadas(site_id, "Pendiente");
						refrescatablatareasrealizadas(site_id, "Realizada");
						refrescatablatareasrealizadas(site_id, "En proceso");*/
						swal({
							title: arrayTextos['275'],
							text: arrayTextos['273'],
							type: "success",
							timer: 3000
						});/*
						$('.date-picker').datetimepicker({
							language: 'es',
							weekStart: 1,
							todayBtn: 1,
							autoclose: 1,
							todayHighlight: 1,
							startView: 2,
							minView: 2,
							forceParse: 0,
							format: 'dd/mm/yyyy'
						});
						setTimeout(function () {*/
						verdetalles(tarea_id);
						/*var id = document.getElementById("fila" + tarea_id).parentNode;
						
						if (id.id == "tareasenproceso") {
							refrescacontadortareas(site_id, "En proceso");
						}
						if (id.id == "tareasrealizadas") {
							refrescacontadortareas(site_id, "Realizada");
						}
						if (id.id == "tareaspendientes") {
							refrescacontadortareas(site_id, "Pendiente");
						}
					}, 900);
					setTimeout(function () {
						var id = document.getElementById("fila" + tarea_id).parentNode;
						if (id.id == "tareasenproceso") {
							muestratareasenproceso();
						}
						if (id.id == "tareasrealizadas") {
							muestratareasrealizadas();
						}
						if (id.id == "tareaspendientes") {
							muestratareaspendientes();
						}
					}, 900);*/

					} else {
						swal({
							title: arrayTextos['3'],
							text: arrayTextos['12'],
							type: "error",
							timer: 3000
						});
					}
				}
			});
		}
	});
}

function cambiaestadotarea(tarea_id, site_id, estadoantiguo) {
	estado = document.getElementById("estado" + tarea_id).value;

	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cambiaestadotarea.php",
		data: "estado=" + estado + "&tarea_id=" + tarea_id + "&site_id=" + site_id,
		success: function (msg) {
			if (msg.indexOf('rrorerrorerror') <= 0) {
				swal({
					title: arrayTextos['275'],
					text: arrayTextos['273'],
					type: "success",
					timer: 3000
				});
				//verdetalles(tarea_id);
				refrescatablatareasrealizadas(site_id, "Pendiente");
				refrescatablatareasrealizadas(site_id, "Realizada");
				refrescatablatareasrealizadas(site_id, "En proceso");
				refrescacontadortareas(site_id, estadoantiguo);

				$('.date-picker').datetimepicker({
					language: 'es',
					weekStart: 1,
					todayBtn: 1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					minView: 2,
					forceParse: 0,
					format: 'dd/mm/yyyy'
				});
				setTimeout(function () {
					if (estadoantiguo == "En proceso") {
						muestratareasenproceso();
					}
					if (estadoantiguo == "Realizada") {
						muestratareasrealizadas();
					}
					if (estadoantiguo == "Pendiente") {
						muestratareaspendientes();
					}
				}, 900);
			} else {
				swal({
					title: arrayTextos['3'],
					text: arrayTextos['12'],
					type: "error",
					timer: 3000
				});
			}
		}
	});


}
function cambiafechafintarea(tarea_id, site_id) {
	var fechafin = document.getElementById('fechafin' + tarea_id).value;
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cambiafechafintarea.php",
		data: "tarea_id=" + tarea_id + "&fechafin=" + fechafin,
		success: function (msg) {
			if (msg.indexOf('rrorerrorerror') <= 0) {
				swal({
					title: arrayTextos['275'],
					text: arrayTextos['274'],
					type: "success",
					timer: 3000
				});
				refrescatablatareasrealizadas(site_id, "Pendiente");
				refrescatablatareasrealizadas(site_id, "Realizada");
				refrescatablatareasrealizadas(site_id, "En proceso");
			} else {
				swal({
					title: arrayTextos['3'],
					text: arrayTextos['12'],
					type: "error",
					timer: 3000
				});
			}
		}
	});

}

function cambiakeywordtarea(tarea_id) {
	var keyword = document.getElementById('selectorkeyword' + tarea_id).value;
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cambiarkeywordtarea.php",
		data: "tarea_id=" + tarea_id + "&keyword=" + keyword,
		success: function (msg) {
			if (msg.indexOf('rrorerrorerror') <= 0) {
				swal({
					title: arrayTextos['275'],
					text: arrayTextos['296'],
					type: "success",
					timer: 3000
				});
			} else {
				swal({
					title: arrayTextos['3'],
					text: arrayTextos['12'],
					type: "error",
					timer: 3000
				});
			}
		}
	});

}

function cambiaprioridadtarea(tarea_id, site_id) {
	var prioridad = document.getElementById('selectorprioridad' + tarea_id).value;
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cambiarprioridadtarea.php",
		data: "tarea_id=" + tarea_id + "&prioridad=" + prioridad,
		success: function (msg) {
			if (msg.indexOf('rrorerrorerror') <= 0) {
				if (prioridad == "Alta") {
					color = "#ff00007d";
				} else if (prioridad == "Media") {
					color = " #FFC300 ";
				} else if (prioridad == "Baja") {
					color = " #3498db ";
				} else {
					color = "white";
				}
				refrescatablatareasrealizadas(site_id, "Pendiente");
				refrescatablatareasrealizadas(site_id, "Realizada");
				refrescatablatareasrealizadas(site_id, "En proceso");
				document.getElementById('selectorprioridad' + tarea_id).style.display = 'none';
				document.getElementById('circuloprioridad' + tarea_id).style.background = color;
				swal({
					title: arrayTextos['275'],
					text: arrayTextos['296'],
					type: "success",
					timer: 3000
				});

			} else {
				swal({
					title: arrayTextos['3'],
					text: arrayTextos['12'],
					type: "error",
					timer: 3000
				});
			}
		}
	});

}

function actualizadescripciontarea(tarea_id) {
	var textareatarea = document.getElementById('textareatarea' + tarea_id).value;
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/cambiadescripciontarea.php",
		data: "tarea_id=" + tarea_id + "&textareatarea=" + textareatarea,
		success: function (msg) {
			if (msg.indexOf('rrorerrorerror') <= 0) {
			} else {
				swal({
					title: arrayTextos['3'],
					text: arrayTextos['12'],
					type: "error",
					timer: 3000
				});
			}
		}
	});

}
function ordenaofiltratareas(siteid) {
	refrescatablatareasrealizadas(siteid, "Pendiente");
	refrescatablatareasrealizadas(siteid, "Realizada");
	refrescatablatareasrealizadas(siteid, "En proceso");
}

function eliminatarea(siteid, tarea_id) {

	swal({
		title: arrayTextos['290'],
		text: arrayTextos['291'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['35'],
		cancelButtonText: arrayTextos['36'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			var id = document.getElementById("fila" + tarea_id).parentNode;
			var textoid = id.id;

			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/eliminatarea.php",
				data: "tarea_id=" + tarea_id,
				success: function (msg) {
					if (msg.indexOf('rrorerrorerror') <= 0) {
						swal({
							title: arrayTextos['292'],
							text: arrayTextos['293'],
							type: "success",
							timer: 3000
						});

						refrescatablatareasrealizadas(siteid, "Pendiente");
						refrescatablatareasrealizadas(siteid, "Realizada");
						refrescatablatareasrealizadas(siteid, "En proceso");
						setTimeout(function () {

							if (textoid == "tareasenproceso") {
								refrescacontadortareas(siteid, "En proceso");
								muestratareasenproceso();
							}
							if (textoid == "tareasrealizadas") {
								refrescacontadortareas(siteid, "Realizada");
								muestratareasrealizadas();
							}
							if (textoid == "tareaspendientes") {
								refrescacontadortareas(siteid, "Pendiente");
								muestratareaspendientes();
							}
						}, 300);
						setTimeout(function () {

							if (textoid == "tareasenproceso") {
								muestratareasenproceso();
							}
							if (textoid == "tareasrealizadas") {
								muestratareasrealizadas();
							}
							if (textoid == "tareaspendientes") {
								muestratareaspendientes();
							}
						}, 500);
					} else {
						swal({
							title: arrayTextos['3'],
							text: arrayTextos['12'],
							type: "error",
							timer: 3000
						});
					}
				}
			});
		}
	});

}
function refrescacontadortareas(site_id, estado) {


	$("#contadortareas").html("<div style='text-align:center;'><br><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/refrescacontadortareas.php",
		data: "site_id=" + site_id + "&estado=" + estado,
		success: function (msg) {
			$("#contadortareas").html(msg);
		}
	});
}


function crearhistorico(tarea_id, subtarea_id) {

	var comentario_historico = $('#comentario_historico').val();
	if (comentario_historico == "") {
		return false;
	} else {
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/crearhistorico.php",
			data: "comentario_historico=" + comentario_historico + "&tarea_id=" + tarea_id + "&subtarea_id=" + subtarea_id,
			success: function (msg) {
				if (msg.indexOf('rrorerrorerror') <= 0) {
					verhistoricotarea(tarea_id, subtarea_id);
				} else {
					swal({
						title: arrayTextos['3'],
						text: arrayTextos['12'],
						type: "error",
						timer: 3000
					});
				}
			}
		});
	}
}

function crearsubtarea(tarea_id) {

	var nombre = $('#nombre' + tarea_id).val();
	var observaciones = $('#observaciones' + tarea_id).val();
	if (nombre == "") {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['268'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else {
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/crearsubTarea.php",
			data: "nombre=" + nombre + "&tarea_id=" + tarea_id + "&observaciones=" + observaciones,
			success: function (msg) {
				if (msg.indexOf('rrorerrorerror') <= 0) {
					swal({
						title: arrayTextos['269'],
						text: arrayTextos['271'],
						type: "success",
						timer: 3000
					});
					$('#subfilatabla' + tarea_id).html(msg);
					$('#nombre' + tarea_id).val("");
					$('#observaciones' + tarea_id).val("");
					$('#myModal').modal('hide');
					verdetalles(tarea_id);
				} else {
					swal({
						title: arrayTextos['3'],
						text: arrayTextos['12'],
						type: "error",
						timer: 3000
					});
				}
			}
		});
	}
}
function crearsubTareaModal(idtarea) {
	$("#myModal").modal();
	const modal_title = locale === 'es_ES' ? 'Crear subtarea ' : __['subtarea '];
	$('#modal-title').html(modal_title);
	$('#modal-body').html(document.getElementById('subfilamodal' + idtarea).innerHTML);
}

function crearTareaModal() {
	document.getElementById('tareamodal').style.display = "block";
	document.getElementById('muestracreartarea').style.display = "none";
	document.getElementById('ocultacreartarea').style.display = "block";
}
function ocultarTareaModal() {
	document.getElementById('tareamodal').style.display = "none";
	document.getElementById('muestracreartarea').style.display = "block";
	document.getElementById('ocultacreartarea').style.display = "none";
}
function verhistoricotarea(tarea_id, subtarea_id) {
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/verhistoricotarea.php",
		data: "tarea_id=" + tarea_id + "&subtarea_id=" + subtarea_id,
		success: function (msg) {
			$("#myModal").modal();
			const modal_title = locale === 'es_ES' ? 'Historial de la tarea ' : __['Tarea '];
			$('#modal-title').html(modal_title);
			$('#modal-body').html(msg);
		}
	});
}

function muestratareaspendientes() {
	$('#tareasrealizadas').hide();
	$('#tareasenproceso').hide();
	$('#tareaspendientes').show();
	$('#barratareapendiente').show();
	$('#barratarearealizada').hide();
	$('#barratareaenproceso').hide();
	$('#exclamacionverde').show();
	$('#exclamaciongris').hide();
	$('#exclamacionverde').show();
	$('#exclamaciongris').hide();
	$('#timerverde').hide();
	$('#checkgris').show();
	$('#checkverde').hide();
	$('#timergris').show();
	$('#botontareapendiente').addClass('colorverde');
	$('#botontareaenproceso').removeClass('colorverde');
	$('#botontarearealizada').removeClass('colorverde');
	$('#botontareapendiente').removeClass('fondogris');
	$('#botontareaenproceso').addClass('fondogris');
	$('#botontarearealizada').addClass('fondogris');
}
function muestratareasenproceso() {
	$('#exclamacionverde').hide();
	$('#exclamaciongris').show();
	$('#timerverde').show();
	$('#checkgris').show();
	$('#checkverde').hide();
	$('#timergris').hide();
	$('#tareasrealizadas').hide();
	$('#tareasenproceso').show();
	$('#barratareapendiente').hide();
	$('#barratarearealizada').hide();
	$('#barratareaenproceso').show();
	$('#tareaspendientes').hide();
	$('#botontareapendiente').removeClass('colorverde');
	$('#botontareaenproceso').addClass('colorverde');
	$('#botontarearealizada').removeClass('colorverde');
	$('#botontareapendiente').addClass('fondogris');
	$('#botontareaenproceso').removeClass('fondogris');
	$('#botontarearealizada').addClass('fondogris');
}
function muestratareasrealizadas() {
	$('#exclamacionverde').hide();
	$('#exclamaciongris').show();
	$('#timerverde').hide();
	$('#checkgris').hide();
	$('#checkverde').show();
	$('#timergris').show();
	$('#tareasrealizadas').show();
	$('#tareaspendientes').hide();
	$('#tareasenproceso').hide();
	$('#barratareapendiente').hide();
	$('#barratarearealizada').show();
	$('#barratareaenproceso').hide();
	$('#botontareapendiente').removeClass('colorverde');
	$('#botontareaenproceso').removeClass('colorverde');
	$('#botontarearealizada').addClass('colorverde');
	$('#botontareapendiente').addClass('fondogris');
	$('#botontareaenproceso').addClass('fondogris');
	$('#botontarearealizada').removeClass('fondogris');
}

function backlinkconsultar() {

	var dominio = $('#urlBacklinks').val();

	dominio = dominio.toLowerCase();
	dominio = dominio.replace("http://", "");
	dominio = dominio.replace("https://", "");
	dominio = dominio.replace("www.", "");
	dominio = dominio.replace("/", "");

	if (!dominioValido(dominio)) {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['130'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else {
		$("#listadobacklinks").html("<div style='text-align:center;'><br><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/insertaBacklinks.php",
			data: "dominio=" + dominio,
			success: function (msg) {
				if (msg.indexOf("Error") == -1 && msg.indexOf("noanalisisbacklinks") == -1) {
					$("#listadobacklinks").html(msg);
					pintagrafica();
				} else if (msg.indexOf("noanalisisbacklinks") != -1) {
					$("#listadobacklinks").html("");
					swal({
						title: arrayTextos['266'],
						text: arrayTextos['267'],
						type: "warning",
						timer: 5000
					});
				} else {
					backlinkconsultar();
				}
			}
		});
	}
}


function muestraAnalisisbacklinks(id, dominio, dominio_from, tipo, orden) {
	$('#button-' + id).toggleClass('button-green');
	$('#button-' + id + ' .button-icon').toggle();
	if ($('#trBorde' + id).css("visibility") == 'collapse') $('#trBorde' + id).css("visibility", "visible");
	else $('#trBorde' + id).css("visibility", "collapse");
	if (tipo == 1) {
		$("#myModal").modal();
		var nowtime = new Date();
		var t = nowtime.getTime();
		const modal_title = locale === 'es_ES' ? 'Detalle de enlaces desde ' + dominio_from : __['Detalle de enlaces desde ' + dominio_from];
		$('#modal-title').html(modal_title);
		$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/recuperaBacklinksDominioFrom.php",
			data: "id=" + id + "&dominio_from=" + dominio_from + "&dominio=" + dominio + "&tipo=" + tipo + "&orden=" + orden,
			success: function (msg) {
				if (msg) {
					$('#modal-body').html(msg);
					$('#listadobacklinksdetalle').html('');
				} else {

					const no_competencia = `
					<div class="modal-body-container">
						<p class="alert alert-warning"><i class="fa fa-warning"></i> No hay datos suficientes todavÃ­a</p>
					</div>
					`;

					$('#modal-body').html(no_competencia);
				}
			}
		});
	} else if (tipo == 2) {
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/recuperaBacklinksDominioFrom.php",
			data: "dominio_from=" + dominio_from + "&dominio=" + dominio + "&tipo=" + tipo + "&orden=" + orden,
			success: function (msg) {
				if (msg) {
					$('#listadobacklinksdetalle').html(msg);
					$('html, body').animate({
						scrollTop: $("#listadobacklinksdetalle").offset().top
					}, 1000);
				} else {

					const no_competencia = `
					<div class="modal-body-container">
						<p class="alert alert-warning"><i class="fa fa-warning"></i> No hay datos suficientes todavÃ­a</p>
					</div>
					`;

					$('#listadobacklinksdetalle').html(no_competencia);
					$('html, body').animate({
						scrollTop: $("#listadobacklinksdetalle").offset().top
					}, 1000);
				}
			}
		});
	} else if (tipo == 3) {
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/recuperaBacklinksDominioFrom.php",
			data: "dominio_from=" + dominio_from + "&dominio=" + dominio + "&tipo=" + tipo + "&orden=" + orden,
			success: function (msg) {
				if (msg) {
					$('#listadobacklinksdetalle').html('');
					$("#listadobacklinks").html(msg);

				} else {

					const no_competencia = `
					<div class="modal-body-container">
						<p class="alert alert-warning"><i class="fa fa-warning"></i> No hay datos suficientes todavÃ­a</p>
					</div>
					`;

					$('#listadobacklinksdetalle').html(no_competencia);
					$('html, body').animate({
						scrollTop: $("#listadobacklinksdetalle").offset().top
					}, 1000);
				}
			}
		});
	} else if (tipo == 4) {
		if (document.getElementById("fila" + dominio_from).innerHTML == "" || orden != "") {
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/recuperaBacklinksDominioFrom.php",
				data: "dominio_from=" + dominio_from + "&dominio=" + dominio + "&tipo=" + tipo + "&orden=" + orden,
				success: function (msg) {
					if (msg) {
						$('#listadobacklinksdetalle').html('');
						document.getElementById("fila" + dominio_from).innerHTML = "<td colspan='6'>" + msg + "</td>";

					} else {

						const no_competencia = `
						<div class="modal-body-container">
							<p class="alert alert-warning"><i class="fa fa-warning"></i> No hay datos suficientes todavÃ­a</p>
						</div>
						`;

						$('#listadobacklinksdetalle').html(no_competencia);
						$('html, body').animate({
							scrollTop: $("#listadobacklinksdetalle").offset().top
						}, 1000);
					}
				}
			});
		} else {
			document.getElementById("fila" + dominio_from).innerHTML = "";
		}
	}
}



function recuperaAnalisisbacklinks(dominio, orden) {
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/recuperaBacklinks.php",
		data: "dominio=" + dominio + "&orden=" + orden,
		success: function (msg) {
			$(window).scrollTop(0);
			if (msg.indexOf("Error") == -1) {
				$("#listadobacklinks").html(msg);
				pintagrafica();
			} else {
				backlinkconsultar();
			}
		}
	});
}
function backlinkconsultarcondominio(urlBacklinks) {


	if (!dominioValido(urlBacklinks)) {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['130'],
			type: "warning",
			timer: 3000
		});
		return false;
	} else {
		$(window).scrollTop(0);
		$("#listadobacklinks").html("<div style='text-align:center;'><br><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/insertaBacklinks.php",
			data: "dominio=" + urlBacklinks,
			success: function (msg) {
				if (msg.indexOf("Error") == -1) {
					$("#listadobacklinks").html(msg);
					pintagrafica();
				} else {
					backlinkconsultar();
				}
			}
		});
	}
}



function exportarexcelauditoria(tipo, subtipo) {
	/*$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/exportaexcelbacklinks.php",
		data: "urldominio=" + urldominio,
		success: function (msg) {
			alert(msg);
		}
	});*/
	location.href = WEB_ROOT + "/ajax/exportaexcelauditoria.php?tipo=" + tipo + "&subtipo=" + subtipo;
}

function exportarexcelbacklink(urldominio) {
	/*$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/exportaexcelbacklinks.php",
		data: "urldominio=" + urldominio,
		success: function (msg) {
			alert(msg);
		}
	});*/
	location.href = WEB_ROOT + "/ajax/exportaexcelbacklinks.php?urldominio=" + urldominio;
}
function vernotificaciones() {
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/vernotificaciones.php",
		data: "",
		success: function (msg) {
			$('#imagenotificaciones').show();
			$('#notificaciones').show();
			$('#notificaciones').html(msg);
			document.getElementById("borrarsileenotificacion").remove();
		}
	});
}

$("html").on('click', function (e) {
	$("#notificaciones").click(function (e) {
		e.stopPropagation();
	});
	$('#notificaciones').hide(); $('#imagenotificaciones').hide();
});

function kresarch(orden) {

	const keyword = $('#keyword').val();
	const keyword_pais = $('#keyword_pais').val();
	const keyword_idioma = $('#keyword_idioma').val();

	if (keyword == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['140'],
			type: "warning",
			timer: 3000
		});
		return false;
	}

	if (keyword_pais == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['141'],
			type: "warning",
			timer: 3000
		});
		return false;
	}

	if (keyword_idioma == '') {
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['142'],
			type: "warning",
			timer: 3000
		});
		return false;
	}

	$("#listadoKeywords").html("<div style='text-align:center;'><br><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");

	$.ajax({
		type: "POST",
		url: WEB_ROOT + "ajax/kresearch.php",
		data: {
			keyword,
			keyword_pais,
			keyword_idioma,
			orden,
		},
		success: function (msg) {

			const data = JSON.parse(msg);

			if (data.status === 'ERROR') {
				swal({
					title: arrayTextos['3'],
					text: data.message,
					type: "warning",
					timer: 3000
				});
			} else {

				dataLayer.push({
					'event': 'keywordResearch',
					'mainKeyword': keyword,
					'country': keyword_pais,
					'language': keyword_idioma,
					'mainKeywordVolume': data.keyword_vol,
					'results': data.total_results
				});

				$('#listadoKeywords').html(data.message);
			}
		}
	});
}




function muestraPestanaDensidad(num, id) {
	$('input').removeClass('botonVerde');
	$('input#' + id).toggleClass('botonVerde');
	$('#pestanaDensidad1').hide();
	$('#pestanaDensidad2').hide();
	$('#pestanaDensidad3').hide();
	$('#pestanaDensidad' + num).show();
}

function leyendaProminencia() {
	abreModal(arrayTextos['170'], arrayTextos['171']);
}

function leyenda(tipo) {
	if (tipo == 'pagerank') texto = arrayTextos['172'];
	else if (tipo == 'arquitectura') texto = arrayTextos['173'];
	else if (tipo == 'tutoriales') texto = arrayTextos['174'];
	else if (tipo == 'auditoria') texto = arrayTextos['175'];
	else if (tipo == 'tracking') texto = arrayTextos['176'];
	else if (tipo == 'densidad') texto = arrayTextos['177'];
	else if (tipo == 'thinContent') texto = arrayTextos['178'];
	else if (tipo == 'canibalizaciones') texto = arrayTextos['179'];
	else if (tipo == 'traficoOrganico') texto = arrayTextos['180'];
	else if (tipo == 'visibilidad') texto = arrayTextos['181'];
	else if (tipo == 'offPage') texto = arrayTextos['182'];
	else if (tipo == 'soporte') texto = arrayTextos['183'];
	else if (tipo == 'url') texto = arrayTextos['184'];
	else if (tipo == 'kresearch') texto = arrayTextos['185'];
	else if (tipo == 'indefinido') texto = arrayTextos['186'];
	else if (tipo == 'backlinks') texto = arrayTextos['227'];
	else if (tipo == 'dashboard') texto = arrayTextos['246'];
	else if (tipo == 'gestionTareas') texto = arrayTextos['272'];
	abreModal(arrayTextos['283'], texto);
}

function capaUsuario(parte) {
	$('.auditButton').removeClass('auditButtonSelect');
	$('.zonaUsuario').hide();
	$('#usuarioBoton' + parte).toggleClass('auditButtonSelect');
	mostrarCapa(parte);
}

function capaSliderHome(id) {
	//$('.func').hide();
	$(".func").hide();
	$("#func" + id).fadeIn("slow");
	//location.href="#func"+id;
	//if (document.getElementById('func'+id).style.display=='none') mostrarCapa('#func'+id);
}

function muestraPlanes(tipo) {
	$('.productoPlan').removeClass('planSelecc');
	$(".productoUnidad").hide();
	$("#planes" + tipo).fadeIn("slow");
	$('#productoPlan' + tipo).toggleClass('planSelecc');
}

function nuevoDominio(modo) {

	var dominio = $('#nuevoDominio').val();

	if (dominio == '') {
		return false;
	}

	dominio = dominio.toLowerCase();
	dominio = dominio.replace("http://", "");
	dominio = dominio.replace("https://", "");
	dominio = dominio.replace("www.", "");

	if (dominio.indexOf("/") > 0) {
		dominio = dominio.substring(0, dominio.indexOf("/"));
	}

	if (!dominioValido(dominio)) {
		//$('#nuevoDominio').val("");
		swal({
			title: arrayTextos['3'],
			text: arrayTextos['148'],
			type: "warning",
			timer: 30000
		});
		return false;
	}

	var puntos = dominio.split(".");

	subdominio = 'no';

	if (puntos.length > 2) {
		subdominio = 'si';
		if (
			(
				puntos[puntos.length - 2] == 'gov' ||
				puntos[puntos.length - 2] == 'edu' ||
				puntos[puntos.length - 2] == 'com' ||
				puntos[puntos.length - 2] == 'net' ||
				puntos[puntos.length - 2] == 'org' ||
				puntos[puntos.length - 2].length == 2
			)
			&& puntos[puntos.length - 1].length == 2
		) {
			subdominio = 'no';
		}
	}

	if (subdominio == 'si' && modo != 'onboarding') {
		swal({
			title: arrayTextos['149'],
			text: arrayTextos['150'],
			icon: "warning",
			buttons: [
				arrayTextos['36'],
				arrayTextos['35']
			],
			showCancelButton: true,
			confirmButtonText: arrayTextos['151'],
			cancelButtonText: arrayTextos['152'],
			dangerMode: true
		}, function (isConfirm) {
			if (!isConfirm) {
				dominio = dominio.substring(dominio.indexOf(".") + 1);
				$('#nuevoDominio').val(dominio);
			}
		});
	}

	$('#nuevoDominio').val(dominio);
	return true;

}

function dominioValido2(domain) {
	var re = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
	return domain.match(re);
}

function dominioValido(domain) {
	if (!domain) return false;
	var re = /^(?!:\/\/)([a-zA-Z0-9-Ã±Ã‘]+\.){0,5}[a-zA-Z0-9-Ã±Ã‘][a-zA-Z0-9-Ã±Ã‘]+\.[a-zA-Z]{2,64}?$/gi;
	return re.test(domain);
}

/*
function formaPago(forma){
	$('#enlace'+forma).css("border", "2px #ccc solid");
	if (forma=='stripe'){
		$('#imgStripe').attr('src', WEB_ROOT+'img/tarjetas_color.jpg');
		$('#imgPayPal').attr('src', WEB_ROOT+'img/paypal_bn.jpg');
		$('#enlacepaypal').css("border", "2px #fff solid");
	}else if (forma=='paypal'){
		$('#imgStripe').attr('src', WEB_ROOT+'img/tarjetas_bn.jpg');
		$('#imgPayPal').attr('src', WEB_ROOT+'img/paypal_color.jpg');
		$('#enlacestripe').css("border", "2px #fff solid");
	}
	$('#formaPago').val(forma);
	completoPagar("notexto");
}
*/

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function cad6(data1) {
	dat = atob(data1);
	return dat;
}

function cierraOnBoarding() {

	$('#interiorCabecera').removeClass("blur");
	$('#contenedorInterior').removeClass("blur");
	location.href = WEB_ROOT + 'keyword-research/?d=1';
	/*
	$('#myModal').modal('hide');
	await sleep(500);
	onboarding(1);
	$(".modal-content").css({"height": "auto"});
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax( {
		type:"POST", url:WEB_ROOT+"ajax/cierraFranjaVerde.php",
		data:"t="+tiempo+"&ambito=onboardingPasos",
		success: function (msg) {
			
		}
	})
	*/

}

function detectakresearchoanalisis() {
	var keyworddominio = $('#keyword').val();
	if (keyworddominio.indexOf("http") != -1 || keyworddominio.indexOf(".es") != -1 || keyworddominio.indexOf(".com") != -1 || keyworddominio.indexOf(".") != -1) {
		document.formWDFkresearch.action = "../visibilidad/";
	} else {
		document.formWDFkresearch.action = "../keyword-research/";
	}
	document.formWDFkresearch.submit();
}


function check_all_visible_tareas() {

	const is_checked = $('#cabeceraChecktarea').is(':checked');

	if (is_checked) {

		$('.checktarea').each(function (e) {

			const is_visible = $(this).parent().parent().is(':visible');

			if (is_visible) {
				$(this).prop('checked', true);
			}

		});

	} else {

		$('.checktarea').prop('checked', false);

	}


}


function check_all_visible_id(id, clase) {

	const is_checked = $('#' + id).is(':checked');

	if (is_checked) {

		$('.' + clase).each(function (e) {

			const is_visible = $(this).parent().parent().is(':visible');

			if (is_visible) {
				$(this).prop('checked', true);
			}

		});

	} else {

		$('.' + clase).prop('checked', false);

	}


}


function guardaimagenbuscada(idbuscar, nombre) {
	var domElement = document.getElementById(idbuscar);
	html2canvas(
		document.querySelector("#" + idbuscar)).then(canvas => {
			var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
			$.ajax({
				url: '../ajax/guardaimagen.php',
				type: "POST",
				dataType: 'json',
				data: { 'image': image, 'id': nombre },
				success: function (obj) {
				}
			});
		});
}
function muestramodalcargando(site_id, proyecto) {
	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$("#myModal").modal();
	setTimeout(function () {
		automatizarinforme(site_id, proyecto);
	}, 500);
}
function muestramodalcargandoprogramar(site_id, proyecto) {
	$("#modal-body").html("<div style='text-align:center;'><img src='" + WEB_ROOT + "img/loading.gif' width='100'></div>");
	$("#myModal").modal();
	setTimeout(function () {
		automatizarinformeprogramar(site_id, proyecto);
	}, 500);
}



function modificadatosinforme(id) {
	var email = $("#Email" + id).val();
	var observaciones = $('#observaciones' + id).val();
	var analyticscheck = document.getElementById('analytics' + id).checked;
	if (analyticscheck) {
		analytics = 1;
	} else {
		analytics = 0;
	}
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/modificaInformeGuardado.php",
		data: "id=" + id + "&email=" + email + "&observaciones=" + observaciones + "&analytics=" + analytics,
		success: function (msg) {
		}
	});
}

function modalinformetarea(id, tarea, envio, fin) {
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/modalInformeTarea.php",
		data: "id=" + id + "&tarea=" + tarea + "&envio=" + envio + "&fin=" + fin,
		success: function (msg) {
			$("#modal-body").html(msg);
			$("#myModal").modal();
		}
	});
}
function modalinformekeyword(id, keyword, envio, fin) {
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/modalInformeKeyword.php",
		data: "id=" + id + "&keyword=" + keyword + "&envio=" + envio + "&fin=" + fin,
		success: function (msg) {
			$("#modal-body").html(msg);
			$("#myModal").modal();
		}
	});
}

function guardarmodalinformetarea(id) {
	var tareas = "";
	$('.checktareaup').each(function () {
		if ($(this).is(':checked')) {
			const tarea_id = $(this).attr('id');
			tareas = tareas + document.getElementById(tarea_id).value + ";";

		}
	});
	var tareastotales = document.getElementById('cabeceraChecktareaup').checked;
	if (tareastotales) {
		todastareas = "todas";
	} else {
		todastareas = 0;
	}
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/modalInformeTareaGuardar.php",
		data: "id=" + id + "&tarea=" + tareas + "&todastareas=" + todastareas,
		success: function (msg) {
			location.reload();
		}
	});
}
function guardarmodalinformekeyword(id) {
	var keywords = '';
	$('.checkTrackingmo').each(function () {
		if ($(this).is(':checked')) {
			const checkbox_id = $(this).attr('id');
			keywords = keywords + $('#' + checkbox_id).val() + ";";
		}
	});
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/modalInformeKeywordGuardar.php",
		data: "id=" + id + "&keywords=" + keywords,
		success: function (msg) {
			location.reload();
		}
	});
}

function eliminaInformeGuardado(id) {
	swal({
		title: arrayTextos['284'],
		text: arrayTextos['285'],
		icon: "warning",
		buttons: [
			arrayTextos['36'],
			arrayTextos['35']
		],
		showCancelButton: true,
		confirmButtonText: arrayTextos['79'],
		cancelButtonText: arrayTextos['80'],
		dangerMode: true
	}, function (isConfirm) {
		if (isConfirm) {
			$.ajax({
				type: "POST", url: WEB_ROOT + "ajax/eliminaInformeGuardado.php",
				data: "id=" + id,
				success: function (msg) {
					swal({
						title: arrayTextos['286'],
						text: arrayTextos['287'],
						type: "success",
						timer: 3000
					});
					document.getElementById('tablainformesguardados').innerHTML = "";
					$('#filainforme' + id).remove();
				}
			})
		}
	});
}


function automatizarinforme(site_id, proyecto) {

	var email = $("#Email2").val();
	var fechainicio = $("#fechainicio").val();
	var fechafin = $("#fechafin").val();
	var observaciones = $('#observaciones').val();
	var TextoEmail = $('#TextoEmail').val();
	var keywords = "";
	var analyticscheck = document.getElementById('analytics').checked;
	var tareastotales = document.getElementById('cabeceraChecktarea').checked;
	if (tareastotales) {
		todastareas = "todas";
	} else {
		todastareas = 0;
	}
	if (analyticscheck) {
		analytics = 1;
	} else {
		analytics = 0;
	}
	var tiempoespera = 1000;
	$('.checkTracking').each(function () {
		if ($(this).is(':checked')) {
			const checkbox_id = $(this).attr('id');
			if (keywords == '') {
				keywords = $('#' + checkbox_id).val() + ";";
			}
			keywords = keywords + $('#' + checkbox_id).val() + ";";
			/*var elem = document.getElementById('tr'+$('#' + checkbox_id).val());
			var otraClaseElems = $(elem).find(".keywordGraficaGrande");
			guardaimagenbuscada(elem.children[1].id,$('#' + checkbox_id).val());*/
			//setTimeout(function(){guardaGrafica($('#' + checkbox_id).val(), "", "si");			}, 200);
		}
	});
	var tareas = "";
	var subtareas = "";
	$('.checktarea').each(function () {
		if ($(this).is(':checked')) {
			const tarea_id = $(this).attr('id');
			tareas = tareas + document.getElementById(tarea_id).value + ";";

		}
	});
	if ($('#semanal').is(':checked')) {
		var semanalomensual = "semanal";
	} else if ($('#mensual').is(':checked')) {
		var semanalomensual = "mensual";
	} else {
		var semanalomensual = "no";
	}
	setTimeout(function () {
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/generarinformetrackingcompleto.php",
			data: "analytics=" + analytics + "&TextoEmail=" + TextoEmail + "&todastareas=" + todastareas + "&site_id=" + site_id + "&observaciones=" + observaciones + "&email=" + email + "&tareas=" + tareas + "&keywords=" + keywords + "&semanalomensual=" + semanalomensual + "&fechainicio=" + fechainicio + "&fechafin=" + fechafin,
			success: function (msg) {
				swal({
					title: arrayTextos['278'],
					text: arrayTextos['279'],
					type: "success",
					timer: 5000
				});
				enlaceDescarga("/facturas/pdf-audit/track" + proyecto + ".pdf", "enlacePdf");
				$("#myModal").modal("hide");
				// var codHtml = $("#enlacePdf").innerHTML;
				//window.open("/facturas/pdf-audit/track"+proyecto+".pdf");
			}
		});
	}, tiempoespera);
}

function automatizarinformeprogramar(site_id, proyecto) {

	var email = $("#Email").val();
	var fechainicio = $("#fechainicio").val();
	var fechafin = $("#fechafin").val();
	var observaciones = $('#observaciones').val();
	var TextoEmail = $('#TextoEmail').val();
	var keywords = "";
	var analyticscheck = document.getElementById('analytics').checked;
	var tareastotales = document.getElementById('cabeceraChecktarea').checked;
	if (tareastotales) {
		todastareas = "todas";
	} else {
		todastareas = 0;
	}
	if (analyticscheck) {
		analytics = 1;
	} else {
		analytics = 0;
	}
	var tiempoespera = 1000;
	$('.checkTracking').each(function () {
		if ($(this).is(':checked')) {
			const checkbox_id = $(this).attr('id');
			if (keywords == '') {
				keywords = $('#' + checkbox_id).val() + ";";
			}
			keywords = keywords + $('#' + checkbox_id).val() + ";";
			/*var elem = document.getElementById('tr'+$('#' + checkbox_id).val());
			var otraClaseElems = $(elem).find(".keywordGraficaGrande");
			guardaimagenbuscada(elem.children[1].id,$('#' + checkbox_id).val());*/
			//setTimeout(function(){guardaGrafica($('#' + checkbox_id).val(), "", "si");			}, 200);
		}
	});
	var tareas = "";
	var subtareas = "";
	$('.checktarea').each(function () {
		if ($(this).is(':checked')) {
			const tarea_id = $(this).attr('id');
			tareas = tareas + document.getElementById(tarea_id).value + ";";

		}
	});
	if ($('#semanal').is(':checked')) {
		var semanalomensual = "semanal";
	} else if ($('#mensual').is(':checked')) {
		var semanalomensual = "mensual";
	} else {
		var semanalomensual = "no";
	}
	setTimeout(function () {
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/guardainformeaautomatizar.php",
			data: "analytics=" + analytics + "&TextoEmail=" + TextoEmail + "&todastareas=" + todastareas + "&site_id=" + site_id + "&observaciones=" + observaciones + "&email=" + email + "&tareas=" + tareas + "&keywords=" + keywords + "&semanalomensual=" + semanalomensual + "&fechainicio=" + fechainicio + "&fechafin=" + fechafin,
			success: function (msg) {
				swal({
					title: arrayTextos['278'],
					text: arrayTextos['279'],
					type: "success",
					timer: 5000
				});
				//enlaceDescarga("/facturas/pdf-audit/track" + proyecto + ".pdf", "enlacePdf");
				$("#myModal").modal("hide");
				document.getElementById('tablainformesguardados').innerHTML = msg;
				// var codHtml = $("#enlacePdf").innerHTML;
				//window.open("/facturas/pdf-audit/track"+proyecto+".pdf");
			}
		});
	}, tiempoespera);
}

function onboardingPasos(paso) {
	$('#interiorCabecera').addClass("blur");
	$('#contenedorInterior').addClass("blur");

	if ($('#myModal').css('display') != 'block') {
		//abreModal("", "", "", "");
		$('#myModal').modal({ backdrop: 'static', keyboard: false })
	}
	$(".btn-danger").css({ "display": "none" });
	$(".close").css({ "display": "none" });
	$(".modal-content").css({ "border": "0px" });
	$(".modal-dialog").css({ "width": "90%" });
	$(".modal-dialog").css({ "max-width": "1500px" });
	$(".modal-content").css({ "height": "auto" });
	$(".modal-content").css({ "min-height": "90vh" });
	//$(".modal-content").css({"max-height": "850px"});	
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	$.ajax({
		type: "POST", url: WEB_ROOT + "ajax/onboardingPasos.php",
		data: "t=" + tiempo + "&paso=" + paso,
		success: function (msg) {
			$('#modal-body').html(msg);
		}
	})


	if (paso == 'dominio') {
		var nowtime = new Date();
		var tiempo = nowtime.getTime();
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/cierraFranjaVerde.php",
			data: "t=" + tiempo + "&ambito=onboardingPasos",
			success: function (msg) {

			}
		})
	}


}

function ucfirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


function cierraOnboardingPaginas() {
	$("#myModal").modal("toggle");
	/*$("#myModal").css({"display":"none"});
	$(".modal-backdrop").css({"display":"none"});*/
	$('#interiorCabecera').removeClass("blur");
	$('.interiorContenedor').removeClass("blur");
	$("#sidebarMenu").css({ "z-index": "100", "pointer-events": "initial", "cursor": "initial" });
	$(".modal-arrow").remove();
	$(".modal-dialog").css({ "position": "initial", "left": "initial", "top": "initial", "max-width": "1000px", "width": "" });
	$(".modal-arrow").css({ "position": "initial", "left": "initial", "top": "initial" });
	$(".btn-danger").css({ "display": "initial" });
	$(".modal-content").css({ "border": "initial", "padding": "" });
	$(".close").css({ "display": "initial" });
	$(".modal-header").css({ "height": "50px", "padding": "20px" });
	$('#myModal').removeData('bs.modal');
	vernotificaciones();
}

function setAllMenuIconsBlack() {

	$('.menuIcono img').each(function (e) {

		const img_src = $(this).attr('src');
		const new_img_src = img_src.replace('blanco', 'negro');

		$(this).attr('src', new_img_src);

	});
}

function onboarding(pagina) {
	var nowtime = new Date();
	var tiempo = nowtime.getTime();
	arrayCopy = [];

	$('#interiorCabecera').addClass("blur");
	$('.interiorContenedor').addClass("blur");
	$("#sidebarMenu").css({ "z-index": "999999", "pointer-events": "none", "cursor": "default" });

	var datosCopy = $.ajax({
		type: "POST",
		url: WEB_ROOT + "ajax/textosOnboarding.php",
		async: false
	}).responseText;
	arrayCopy = JSON.parse(datosCopy);

	if (document.getElementById('myModal').style.display != 'block') {
		abreModal("", "<div style='text-align:center'><img src='" + WEB_ROOT + "img/iso2.png'></a><br>&nbsp;<br>&nbsp;<br><h3>" + arrayTextos['187'] + "</h3><br>&nbsp;<br>" + arrayTextos['188'] + "</div> <br>&nbsp;<br> <button class='button-red' style='float:right;' onClick='javascript:onboarding(\"2\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>", "", "550px", "no");
		$(".btn-danger").css({ "display": "none" });
		$(".modal-content").css({ "border": "0px" });
		$(".close").css({ "display": "none" });
		$(".modal-header").css({ "height": "8px", "padding": "0px" });
	}
	if (pagina == 1 || pagina == 6) {
		$.ajax({
			type: "POST", url: WEB_ROOT + "ajax/cierraFranjaVerde.php",
			data: "t=" + tiempo + "&ambito=onboarding",
			success: function (msg) {

			}
		})
	}
	if (pagina == 2) {
		$("#modal-title").html(arrayTextos['212']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['192'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"1\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>2/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"3\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#enlaceTutoriales").offset();
		if ($(".modal-arrow").length) $(".modal-arrow").remove();
		$("#myModal").prepend('<div class="modal-arrow" id="left"></div>');
		$(".modal-arrow").css({ "transform": "rotate(90deg)", "-ms-transform": "rotate(90deg)" });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left - 220, "top": offset.top + 30 });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left, "top": offset.top + 15 });
	} else if (pagina == 3) {
		$("#modal-title").html(arrayTextos['226']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['190'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"2\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>3/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"4\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#enlaceSoporte").offset();
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left - 120, "top": offset.top + 30 });
		$(".modal-arrow").css({ "transform": "rotate(90deg)", "-ms-transform": "rotate(90deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left, "top": offset.top + 15 });
	} else if (pagina == 4) {
		$("#modal-title").html(arrayTextos['213']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['193'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"3\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>4/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"5\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#enlaceUsuarioCabecera").offset();
		$(".modal-arrow").css({ "transform": "rotate(90deg)", "-ms-transform": "rotate(90deg)" });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left - 320, "top": offset.top + 30 });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left, "top": offset.top + 15 });
	} else if (pagina == 5) {
		$("#modal-title").html(arrayTextos['214']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['194'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"4\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>5/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"6\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuSelectProyecto").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuSelectProyecto").outerWidth(), "top": offset.top + 15 });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuSelectProyecto").outerWidth() + 34, "top": offset.top - 20 });
	} else if (pagina == 6) {
		//$("#modal-title").html(arrayTextos['215']); 
		$('#menuKeywordResearch').removeClass('interiorMenuSelec');
		$("#menuKeywordResearch .menuIcono img").attr("src", WEB_ROOT + "img/iconos/kwresearch-negro.svg");
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><h1 id='toolTipTitle'>" + ucfirst(arrayTextos['215'].toLowerCase()) + "</h1><div class='bloqueSombra'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayCopy['tracking'] + "</div></div><br>&nbsp;<br><div style='float:left;padding: 10px;width: 310px;text-align: center;'>1/4</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"7\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuTracking").offset();

		if ($(".modal-arrow").length) $(".modal-arrow").remove();
		$("#myModal").prepend('<div class="modal-arrow" id="left"></div>');
		//$( "#myModal" ).prepend( '<div class=".modal-arrow"><i class="fa fa-caret-left" aria-hidden="true"></i></div>');		
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuTracking").outerWidth(), "top": offset.top });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuTracking").outerWidth() + 34, "top": offset.top - 30 });

		$('#interiorMenu .interiorMenu').removeClass('interiorMenuSelec');
		$('#menuTracking').addClass('interiorMenuSelec');

		setAllMenuIconsBlack();
		$('#menuTracking .menuIcono img').attr("src", WEB_ROOT + "img/iconos/tracking-blanco.svg");

	} else if (pagina == 7) {
		//$("#modal-title").html(arrayTextos['218']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><h1 id='toolTipTitle'>" + ucfirst(arrayTextos['218'].toLowerCase()) + "</h1><div class='bloqueSombra'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayCopy['auditoria'] + "</div></div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"6\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 310px;text-align: center;'>2/4</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"11\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuAuditoria").offset();

		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuAuditoria").outerWidth(), "top": offset.top });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuAuditoria").outerWidth() + 34, "top": offset.top - 30 });

		$('#interiorMenu .interiorMenu').removeClass('interiorMenuSelec');
		$('#menuAuditoria').addClass('interiorMenuSelec');

		setAllMenuIconsBlack();
		$('#menuAuditoria .menuIcono img').attr("src", WEB_ROOT + "img/iconos/onpage-blanco.svg");

	} else if (pagina == 8) {
		//$("#modal-title").html(arrayTextos['216']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><h1 id='toolTipTitle'>" + ucfirst(arrayTextos['216'].toLowerCase()) + "</h1><div class='bloqueSombra'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['196'] + "</div></div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"7\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 310px;text-align: center;'>8/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"9\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuPagerank").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuPagerank").outerWidth(), "top": offset.top });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuPagerank").outerWidth() + 34, "top": offset.top - 30 });
	} else if (pagina == 9) {
		//$("#modal-title").html(arrayTextos['217']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><h1 id='toolTipTitle'>" + ucfirst(arrayTextos['217'].toLowerCase()) + "</h1><div class='bloqueSombra'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['197'] + "</div></div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"8\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 310px;text-align: center;'>9/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"10\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuEnlazado").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuEnlazado").outerWidth(), "top": offset.top });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuEnlazado").outerWidth() + 34, "top": offset.top - 30 });
	} else if (pagina == 10) {
		//$("#modal-title").html(arrayTextos['223']);		
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><h1 id='toolTipTitle'>" + ucfirst(arrayTextos['223'].toLowerCase()) + "</h1><div class='bloqueSombra'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayCopy['kresearch'] + "</div></div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"11\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 310px;text-align: center;'>4/4</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:cierraOnboardingPaginas();'>" + arrayTextos['257'] + " </button><br>&nbsp;<br>");
		var offset = $("#menuKeywordResearch").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuKeywordResearch").outerWidth(), "top": offset.top });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuKeywordResearch").outerWidth() + 34, "top": offset.top - 200 });

		$('#interiorMenu .interiorMenu').removeClass('interiorMenuSelec');
		$('#menuKeywordResearch').addClass('interiorMenuSelec');

		setAllMenuIconsBlack();
		$('#menuKeywordResearch .menuIcono img').attr("src", WEB_ROOT + "img/iconos/kwresearch-blanco.svg");

	} else if (pagina == 11) {
		//$("#modal-title").html(arrayTextos['219']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><h1 id='toolTipTitle'>" + ucfirst(arrayTextos['219'].toLowerCase()) + "</h1><div class='bloqueSombra'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayCopy['wdf'] + "</div></div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"7\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 310px;text-align: center;'>3/4</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"10\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuWDF").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuWDF").outerWidth(), "top": offset.top });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuWDF").outerWidth() + 34, "top": offset.top - 120 });

		$('#interiorMenu .interiorMenu').removeClass('interiorMenuSelec');
		$('#menuWDF').addClass('interiorMenuSelec');

		setAllMenuIconsBlack();
		$('#menuWDF .menuIcono img').attr("src", WEB_ROOT + "img/iconos/densidad-blanco.svg");

	} else if (pagina == 12) {
		$("#modal-title").html(arrayTextos['220']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['200'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"11\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>12/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"13\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuCanibalizaciones").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuCanibalizaciones").outerWidth(), "top": offset.top + 15 });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuCanibalizaciones").outerWidth() + 34, "top": offset.top - 150 });
	} else if (pagina == 13) {
		$("#modal-title").html(arrayTextos['221']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['201'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"12\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>13/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"14\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuThinContent").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuThinContent").outerWidth(), "top": offset.top + 15 });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuThinContent").outerWidth() + 34, "top": offset.top - 160 });
	} else if (pagina == 14) {
		$("#modal-title").html(arrayTextos['224']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['204'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"13\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>14/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"15\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuTraficoOrganico").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuTraficoOrganico").outerWidth(), "top": offset.top + 15 });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuTraficoOrganico").outerWidth() + 34, "top": offset.top - 220 });
	} else if (pagina == 15) {
		$("#modal-title").html(arrayTextos['225']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['205'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"14\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>15/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"16\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuVisibilidad").offset();
		$(".btn-danger").css({ "display": "none" });
		if ($(".modal-arrow").length) $(".modal-arrow").remove();
		$("#myModal").prepend('<div class="modal-arrow" id="left"></div>');
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuVisibilidad").outerWidth(), "top": offset.top + 15 });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuVisibilidad").outerWidth() + 34, "top": offset.top - 220 });
	} else if (pagina == 16) {
		$("#modal-title").html(arrayTextos['222']);
		$("#modal-body").html("<div style='text-align:left;padding:20px;'><img src='https://dinorank.com/img/TeacherLeft.png' style='width: 100px; float: right; margin-left: 20px;'>" + arrayTextos['202'] + "</div><br>&nbsp;<br><button class='button-green' style='float:left;margin-left:20px;' onClick='javascript:onboarding(\"15\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button><div style='float:left;padding: 10px;width: 110px;text-align: center;'>16/17</div><button class='button-green' style='float:right;margin-right:20px;margin-bottom:20px;' onClick='javascript:onboarding(\"17\")'>" + arrayTextos['189'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><br>&nbsp;<br>");
		var offset = $("#menuEnlazadoExterno").offset();
		$(".modal-arrow").css({ "transform": "rotate(0deg)", "-ms-transform": "rotate(0deg)" });
		$(".modal-arrow").css({ "position": "absolute", "left": offset.left + $("#menuEnlazadoExterno").outerWidth(), "top": offset.top + 15 });
		$(".modal-dialog").css({ "position": "absolute", "left": offset.left + $("#menuEnlazadoExterno").outerWidth() + 34, "top": offset.top - 180 });
	} else if (pagina == 17) {
		$("#modal-title").html("");
		$(".modal-content").css({ "padding": "0px" });
		abreModal("", "<div style='text-align:center'><br>&nbsp;<br><img src='" + WEB_ROOT + "img/iso2.png'></a><br>&nbsp;<br>&nbsp;<br><h2>" + arrayTextos['206'] + "</h2><br>&nbsp;<br>" + arrayTextos['207'] + "<br>&nbsp;<br><strong>" + arrayTextos['208'] + "</strong><br>&nbsp;<br><button class='button-green' style='float:right;margin:auto;' onClick='javascript:$(\"#myModal\").modal(\"toggle\");'>" + arrayTextos['245'] + " &nbsp; <i class='fa fa-caret-right' aria-hidden='true'></i></button><button class='button-red' style='margin:auto;float:left;'  onClick='javascript:onboarding(\"16\")'><i class='fa fa-caret-left' aria-hidden='true'></i> &nbsp; " + arrayTextos['191'] + "</button></div> <br>&nbsp;<br>", "", "400px");
	}
}


document.onkeydown = onTecla; 