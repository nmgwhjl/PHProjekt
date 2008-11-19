<?php
/**
 * Table udpater for setup and database manager
 *
 * LICENSE: Licensed under the terms of the PHProjekt 6 License
 *
 * @copyright  2007 Mayflower GmbH (http://www.mayflower.de)
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    CVS: $Id:
 * @author     Eduardo Polidor <polidor@mayflower.de>
 * @package    PHProjekt
 * @subpackage Core
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 */

/**
 * The class provide the functions for create and alter tables on database
 *
 * @copyright  2007 Mayflower GmbH (http://www.mayflower.de)
 * @package    PHProjekt
 * @subpackage Core
 * @license    http://phprojekt.com/license PHProjekt 6 License
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 1.0
 * @author     Eduardo Polidor <polidor@mayflower.de>
 */
class Phprojekt_Table {
    /**
     * Db connection
     *
     * @var string
     */
    protected $_db = null;

    /**
     * Db type
     *
     * @var string
     */
    protected $_dbType = null;

    /**
     * Exclude system fields
     *
     * @var array
     */
    protected $_excludeFields = array('id','ownerId');

    /**
     * Initialize a new table admin
     *
     * @param array $db Db configurations
     */
    public function __construct($db = null)
    {
        $this->_db     = $db;
        $this->_dbType = get_class($db);
        $this->_dbType = strtolower(substr($this->_dbType, strpos($this->_dbType, "Pdo") + 4));
    }

    /**
     * Creates a table
     *
     * @param $tableName String table name
     * @param $fields    Array with fieldnames as key
     *                   Options: 'type', 'length', 'null', 'default')
     * @param $keys      Array with primary keys
     * 
     * @return boolean
     */
    public function createTable($tableName, $fields, $keys = array())
    {
        $tableName = ucfirst($tableName);
        $sqlString = "CREATE TABLE " . $this->_db->quoteIdentifier((string)$tableName) . " (";

        if (is_array($fields) && !empty($fields)) {
            foreach ($fields as $fieldName => $fieldDefinition) {

                $fieldDefinition['length']  = (empty($fieldDefinition['length'])) ? "" : $fieldDefinition['length'];
                $fieldDefinition['null']    = $fieldDefinition['null'];
                $fieldDefinition['default'] = (empty($fieldDefinition['default'])) ? "" : $fieldDefinition['default'];
                $fieldDefinition['default_no_quote'] = (empty($fieldDefinition['default_no_quote'])) ? false : $fieldDefinition['default_no_quote'];

                $sqlString .= $fieldName;
                $sqlString .= $this->_getTypeDefinition($fieldDefinition['type'], $fieldDefinition['length'],
                                                        $fieldDefinition['null'], $fieldDefinition['default'],
                                                        $fieldDefinition['default_no_quote']) . ", ";
            }
        } else {
            return false;
        }

        if (isset($keys)) {

            $sqlString .= "PRIMARY KEY (";

            foreach ($keys as $oneKey) {

                $sqlString .= $oneKey . ", ";
            }
            $sqlString = substr($sqlString, 0, -2);

            $sqlString .= ")";
        } else {
            $sqlString = substr($sqlString, 0, -2);
        }

        $sqlString .= ")";

        return $this->_db->getConnection()->exec($sqlString);
    }

    /**
     * Add a field on a table
     *
     * @param $tableName       String table name
     * @param $fieldDefinition Array with field definition
     *                         Options: 'name', 'type', 'length', 'null', 'default')
     * @param $position        After position
     * 
     * @return boolean
     */
    public function addField($tableName, $fieldDefinition, $position = null)
    {
        $tableName = ucfirst($tableName);
        $sqlString = "ALTER TABLE " . $this->_db->quoteIdentifier((string)$tableName) . " ADD ";

        if (is_array($fieldDefinition) && !empty($fieldDefinition)) {
            $fieldDefinition['length']  = (empty($fieldDefinition['length'])) ?"":$fieldDefinition['length'];
            $fieldDefinition['null']    = $fieldDefinition['null'];
            $fieldDefinition['default'] = (empty($fieldDefinition['default'])) ?"":$fieldDefinition['default'];
            $fieldDefinition['default_no_quote'] = (empty($fieldDefinition['default_no_quote'])) ? false : $fieldDefinition['default_no_quote'];

            $sqlString .= $this->_db->quoteIdentifier((string)$fieldDefinition['name']);
            $sqlString .= $this->_getTypeDefinition($fieldDefinition['type'], $fieldDefinition['length'],
                                                    $fieldDefinition['null'], $fieldDefinition['default'],
                                                    $fieldDefinition['default_no_quote']);
        } else {
            return false;
        }

        if (isset($position)) {

            $sqlString .= " AFTER " . (string)$position;
        }

        return $this->_db->getConnection()->exec($sqlString);
    }

    /**
     * Change the name and parameteres of a field
     *
     * @param $tableName       String table name
     * @param $fieldDefinition Array with field definition
     *                         Options: 'oldName', 'name', 'type', 'length', 'null', 'default')
     * 
     * @return boolean
     */
    public function changeField($tableName, $fieldDefinition, $position = null)
    {
        return $this->modifyField($tableName, $fieldDefinition, $position);
    }

    /**
     * Modifies a field on a table
     *
     * @param $tableName       String table name
     * @param $fieldDefinition Array with field definition
     *                         Options: 'oldName', 'name', 'type', 'length', 'null', 'default')
     * 
     * @return boolean
     */
    public function modifyField($tableName, $fieldDefinition, $position = null)
    {
        $tableName = ucfirst($tableName);
        $sqlString = "ALTER TABLE " . $this->_db->quoteIdentifier((string)$tableName) . " MODIFY ";

        if (is_array($fieldDefinition) && !empty($fieldDefinition)) {
            $fieldDefinition['length']  = (empty($fieldDefinition['length'])) ? "" : $fieldDefinition['length'];
            $fieldDefinition['null']    = $fieldDefinition['null'];
            $fieldDefinition['default'] = (empty($fieldDefinition['default'])) ? "" : $fieldDefinition['default'];
            $fieldDefinition['default_no_quote'] = (empty($fieldDefinition['default_no_quote'])) ? false : $fieldDefinition['default_no_quote'];

            if (isset($fieldDefinition['oldName'])) {
                $sqlString .= $this->_db->quoteIdentifier((string)$fieldDefinition['oldName']) . ' ';
            }
            $sqlString .= $this->_db->quoteIdentifier((string)$fieldDefinition['name']);
            $sqlString .= $this->_getTypeDefinition($fieldDefinition['type'], $fieldDefinition['length'],
                                                    $fieldDefinition['null'], $fieldDefinition['default'],
                                                    $fieldDefinition['default_no_quote']);
        } else {
            return false;
        }

        return $this->_db->getConnection()->exec($sqlString);
    }

    /**
     * Deletes a field on a table
     *
     * @param $tableName       String table name
     * @param $fieldDefinition Array with field definition
     *                         Options: 'name', 'type', 'length', 'null', 'default')
     * 
     * @return boolean
     */
    public function deleteField($tableName, $fieldDefinition)
    {
        $tableName = ucfirst($tableName);
        $sqlString = "ALTER TABLE " . $this->_db->quoteIdentifier((string)$tableName) . " DROP ";

        if (is_array($fieldDefinition) && !empty($fieldDefinition)) {
            $sqlString .= $this->_db->quoteIdentifier((string)$fieldDefinition['name']);
        } else {
            return false;
        }
        return $this->_db->getConnection()->exec($sqlString);
    }

    /**
     * Return an string with the field definition for each table type.
     *
     * @param string  $fieldType   Regular field type names
     * @param int     $fieldLength Field length 
     * @param boolean $allowNull 
     * @param string  $default     Default value
     *
     * @return string
     */
    private function _getTypeDefinition($fieldType, $fieldLength = null, $allowNull = true, $default = null, $defaultNoQuotes = false)
    {
        switch ($this->_dbType) {
            case 'sqlite':
            case 'sqlite2':
                if ($fieldType == 'auto_increment') {
                    $fieldType = 'integer';
                }
                break;
            case 'pgsql':
                if ($fieldType == 'auto_increment') {
                    $fieldType = 'serial';
                }
                if ($fieldType == 'int') {
                    $fieldType   = 'integer';
                    $fieldLength = null;
                }
                break;
            default:
                if ($fieldType == 'auto_increment') {
                    $fieldType = 'int(11) NOT NULL auto_increment';
                }
                break;
        }

        $fieldDefinition = " " . $fieldType;
        if (!empty($fieldLength)) {
            if (($fieldType == 'int') ||
                ($fieldType == 'varchar')) {
                $fieldDefinition .= "(" . (int)$fieldLength . ") ";
            }
        }

        if (!$allowNull) {
            $fieldDefinition .= " NOT NULL ";
        }

        if (!empty($default)) {
            if (empty($defaultNoQuotes)) {
                $fieldDefinition .= " DEFAULT '" . (string)$default ."'";
            } else {
                $fieldDefinition .= " DEFAULT " . (string)$default;
            }
        } else if ($allowNull) {
            $fieldDefinition .= " DEFAULT NULL";
        }

        return $fieldDefinition;
    }

    /**
     * Check the table and return the field
     * If the table don`t exist, try to create it
     *
     * @param string $tableName The name of the table
     * @param array  $fields    The fields definitions
     * @param array  $keys      The PRIMARY KEY values
     *
     * @return array
     */ 
    public function getTableFields($tableName, $fields, $keys = array('id'))
    {
        try {
            $tableFields = $this->_db->describeTable($tableName);
            return $tableFields;
        } catch (Exception $e) {
            $tableName = ucfirst($tableName);
            $this->createTable($tableName, $fields, $keys);
            $tableFields = $this->_db->describeTable($tableName);
            return $tableFields;
        }
    }
    
    /**
     * Delete the table
     *
     * @param string $tableName The name of the table
     * 
     * @return boolean
     */
    public function dropTable($tableName)
    {
        $tableName = ucfirst($tableName);
        $sqlString = "DROP TABLE " . $this->_db->quoteIdentifier((string)$tableName);
        
        return $this->_db->getConnection()->exec($sqlString);
    }
}