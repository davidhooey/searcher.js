function searchATerm(term, data) {
	var cjk_range1 = "[\u4E00-\u9FFF]";
	var cjk_range2 = "[\u3400-\u4DBF]";
	var boundary_chars = " \n\r\t.,“”<>\–\"\+!&;:?-";
	
	// Required RegEx for Russian and likely all non-ASCII characters.
	// (^\|[ \n\r\t.,<>'\"\+!?-]+)(faith[^ \n\r\t.,<>'\"\+!?-]*)([ \n\r\t.,<>'\"\+!?-]+\|$)
	if (term.search(/^\*(.+)\*$/) != -1) {
		if(data.search(RegExp("(^\|[" + boundary_chars + "]+)([^" + boundary_chars + "]*" + term.replace(/\*/g,'') + "[^" + boundary_chars + "]*)([" + boundary_chars + "]+\|$)",'gi')) != -1) {
			return true;
		}
	}
	else if (term.search(/^\*(.+)$/) != -1) {
		if (data.search(RegExp("(^\|[" + boundary_chars + "]+)([^" + boundary_chars + "]*" + term.replace(/\*/g,'') + ")([" + boundary_chars + "]+\|$)",'gi')) != -1) {
			return true;
		}
	}			
	else if (term.search(/^(.+)\*$/) != -1) {
		if (data.search(RegExp("(^\|[" + boundary_chars + "]+)(" + term.replace(/\*/g,'') + "[^" + boundary_chars + "]*)([" + boundary_chars + "]+\|$)",'gi')) != -1) {
			return true;
		}
	}
	else if (term.search(/^(.+)$/) != -1) {
		if (RegExp("(" + cjk_range1 + ")|(" + cjk_range2 + ")").test(term)) {
			if (data.search(term) != -1) {
				return true;
			} 
		}
		else {
			if (data.search(RegExp("(^\|[" + boundary_chars + "]+)(" + term + ")([" + boundary_chars + "]+\|$)",'gi')) != -1) {
				return true;
			}
		}
	}
	else {
		return false;
	}
}

function searcher(terms, data) {
	if (terms.length > 0 && data.length > 0) {
		for (var term=0; term < terms.length; term++) {
			if (!searchATerm(terms[term], data)) {
				return false;
			}
		}
		return true;
	}
	else {
		return false;
	}
	
}