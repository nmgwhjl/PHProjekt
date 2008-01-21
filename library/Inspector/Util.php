<?php
/**
 * Util class
 * 
 * @author     Peter Voringer <peter.voringer@mayflower.de>
 * @copyright  2008 Mayflower GmbH (http://www.mayflower.de)
 * @version    CVS: $Id$
 * @license    
 * @package    Inspector
 * @link       http://www.thinkforge.org/projects/inspector
 * @since      File available since Release 1.0
 * 
 */

/**
 * Inspector Util
 * 
 * Some Utility Functions used by the Framework
 *
 * @copyright  2007 Mayflower GmbH (http://www.mayflower.de)
 * @version    Release: <package_version>
 * @license    
 * @package    Inspector
 * @link       http://www.thinkforge.org/projects/inspector
 * @author     Peter Voringer <peter.voringer@mayflower.de>
 * @since      File available since Release 1.0
 */
class Inspector_Util
{
    /**
     * Tests if value is null, empty or only whitespace(s)
     *
     * @param mixed $value Value to test if blank
     * 
     * @return bool 
     */
    public static function isBlank($value)
    {
        if (!is_string($value) && !is_null($value)) {
            return false;
        }
        
        return trim($value) == '';
    }
    
}
