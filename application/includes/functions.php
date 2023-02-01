<?php
function getQueryParameter(string $name, $default = null) {
	return $_GET[$name] ?? $default;
}

function getQueryBool(string $name): bool {
	return isset($_GET[$name]);
}

function createCheckboxHTML(string $name, string $id, bool $checked = false): string {
	$checkboxHTML = <<<HTML
	<input type="checkbox" name="{$name}" id="{$id}"
	HTML;
	if ($checked) {
		$checkboxHTML .= " checked";
	}
	$checkboxHTML .= ">";
	return $checkboxHTML;
}

function createNumberInputHTML(string $name, string $id, ?float $min, ?float $max, ?float $value, float $step = 1): string {
	$numberInputHTML = <<<HTML
	<input type="number" name="{$name}" id="{$id}"
	HTML;
	if ($min !== null) {
		$numberInputHTML .= " min=\"{$min}\"";
	}
	if ($max !== null) {
		$numberInputHTML .= " max=\"{$max}\"";
	}
	if ($value !== null) {
		$numberInputHTML .= " value=\"{$value}\"";
	}
	if ($step !== null) {
		$numberInputHTML .= " step=\"{$step}\"";
	}
	$numberInputHTML .= ">";
	return $numberInputHTML;
}
