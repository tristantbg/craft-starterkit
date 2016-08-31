<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

  /*
   * Craft config variables
   * ---------------------------------------------------------------------------
   * See: http://buildwithcraft.com/docs/config-settings
   */
  "devMode"                  => false,
  "addTrailingSlashesToUrls" => true,
  "postCpLoginRedirect"      => "entries",
  "siteUrl"                  => "http://" . $_SERVER["SERVER_NAME"] . ":8888/craft/public",
  "useEmailAsUsername"       => true,

  /*
   * Custom config variables
   * ---------------------------------------------------------------------------
   * Variables set by us for use within the project
   */

  // Site environment
  "env" => CRAFT_ENVIRONMENT,

  // Template settings
  "tmpl"  => array(
    "css" => "/assets/css",
    "img" => "/assets/img",
    "js"  => "/assets/js"
  ),

  // Web font stylesheet url, if used
  "webFontCode" => '<link href="http://fonts.googleapis.com/css?family=Oxygen:400,300,700" rel="stylesheet" type="text/css">'

);