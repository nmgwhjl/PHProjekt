<?php
/**
 * Minutes Item model class
 *
 * This software is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License version 2.1 as published by the Free Software Foundation
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @package    PHProjekt
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    $Id$
 * @link       http://www.phprojekt.com
 * @author     Sven Rautenberg <sven.rautenberg@mayflower.de>
 * @since      File available since Release 6.0
 */

/**
 * Minutes model class
 *
 * @copyright  Copyright (c) 2008 Mayflower GmbH (http://www.mayflower.de)
 * @package    PHProjekt
 * @license    LGPL 2.1 (See LICENSE file)
 * @version    Release: @package_version@
 * @link       http://www.phprojekt.com
 * @since      File available since Release 6.0
 * @author     Sven Rautenberg <sven.rautenberg@mayflower.de>
 */
class Minutes_SubModules_MinutesItem_Models_MinutesItem extends Phprojekt_ActiveRecord_Abstract implements Phprojekt_Model_Interface
{
    /**
     * The Minutes object this item is related to
     *
     * @var Phprojekt_Item_Abstract
     */
    protected $_minutes;

    /**
     * The Id of the minutes this Item belongs to
     *
     * @var integer
     */
    protected $_minutesId = null;

    /**
     * The standard information manager with hardcoded
     * field definitions
     *
     * @var Phprojekt_ModelInformation_Interface
     */
    protected $_informationManager;

    /**
     * Validate object
     *
     * @var Phprojekt_Model_Validate
     */
    protected $_validate = null;

    /**
     * Initial state of the data after find()
     *
     * @var array
     */
    protected $_history = null;

    /**
     * Initialize new minutes item
     *
     * @param array $db Configuration for Zend_Db_Table
     *
     * @return void
     */
    public function __construct($db = null)
    {
        if (null === $db) {
            $db = Phprojekt::getInstance()->getDb();
        }
        parent::__construct($db);

        $this->_validate           = Phprojekt_Loader::getLibraryClass('Phprojekt_Model_Validate');
        $this->_informationManager = Phprojekt_Loader::getModel('Minutes_SubModules_MinutesItem',
            'MinutesItemInformation');
    }

    /**
     * Define the clone function for prevent the same point to same object.
     *
     * @return void
     */
    public function __clone()
    {
        parent::__clone();
        $this->_validate           = Phprojekt_Loader::getLibraryClass('Phprojekt_Model_Validate');
        $this->_informationManager = Phprojekt_Loader::getModel('Minutes_SubModules_MinutesItem',
            'MinutesItemInformation');
    }

    /**
     * Return the information manager
     *
     * @return Phprojekt_ModelInformation_Interface
     */
    public function getInformation()
    {
        return $this->_informationManager;
    }

    /**
     * Validate the current record
     *
     * @return boolean
     */
    public function recordValidate()
    {
        $data   = $this->_data;
        $fields = $this->_informationManager->getFieldDefinition(Phprojekt_ModelInformation_Default::ORDERING_FORM);

        return $this->_validate->recordValidate($this, $data, $fields);
    }

    /**
     * Get error message from model
     *
     * @return array
     */
    public function getError()
    {
        return (array) $this->_validate->error->getError();
    }

    /**
     * Get the rights.
     *
     * @return array
     */
    public function getRights()
    {
        return $this->_minutes->getRights();
    }

    /**
     * Save the rights for the current item
     *
     * @param array $rights
     *
     * @return void
     */
    public function saveRights($rights)
    {
        // No code here as the rights are managed by the parent minutes model.
    }

    /**
     * Initialize the related minutes object
     *
     * @param integer $minutesId
     *
     * @return Minutes_Models_MinutesItem
     */
    public function init($minutesId = null)
    {
        $this->_minutes   = Phprojekt_Loader::getModel('Minutes', 'Minutes');
        $this->_minutesId = $minutesId;

        return $this;
    }

    /**
     * Finds a record with current criteria key and populates
     * the object with its data. Makes a copy of the data in the
     * protected $_history array, to be able to detect changes
     * made after calling find().
     *
     * @param mixed Optional criteria. Can be primary key value or array of field=>value pairs.
     *
     * @return Minutes_Models_MinutesItem
     */
    public function find($criteria = null)
    {
        $res = parent::find($criteria);
        // Make a backup of the initial data to compare against in save() method
        $this->_history = $this->_data;
        return $res;
    }

    /**
     * Customized version to calculate the status of a minutes item regardless of its saved database entry.
     *
     * @param string|array $where  Where clause
     * @param string|array $order  Order by
     * @param string|array $count  Limit query
     * @param string|array $offset Query offset
     * @param string       $select The comma-separated columns of the joined columns
     * @param string       $join   The join statements
     *
     * @return Zend_Db_Table_Rowset
     */
    public function fetchAll($where = null, $order = array('sort_order ASC', 'id DESC'), $count = null, $offset = null,
        $select = null, $join = null)
    {
        if (null !== $where) {
            $where .= ' AND ';
        }

        $where .= sprintf('(%s.%s = %d )',
            $this->_db->quoteIdentifier($this->getTableName()), $this->_db->quoteIdentifier('minutes_id'),
            (empty($this->_minutesId) ? $this->_relations['hasMany']['id'] : $this->_minutesId));

        $result = parent::fetchAll($where, $order, $count, $offset, $select, $join);

        // Integrate numbering
        $topicCount    = 0;
        $topicSubCount = 0;
        foreach ($result as $item) {
            if (1 == $item->topicType) {
                $topicCount++;
                $topicSubCount = -1;
            }
            $topicSubCount++;
            $item->topicId = (1 == $item->topicType ? sprintf('%d', $topicCount)
                : sprintf('%d.%d', $topicCount, $topicSubCount));
        }

        return $result;
    }

    /**
     * Save is handled by parent.
     *
     * @return boolean
     */
    public function save()
    {
        $db = $this->getAdapter();

        if (trim($this->sortOrder) == '' || is_null($this->sortOrder) || !$this->sortOrder) {
            // We don't have a sort order yet, most probably a brand-new record.
            // Detect highest available sort order up until now and use next-higher number.
            $sql = 'SELECT MAX(' . $db->quoteIdentifier('sort_order') . ') FROM '
                . $db->quoteIdentifier($this->getTableName()) . ' WHERE '.$db->quoteIdentifier('minutes_id').' = ?';
            $result  = $db->fetchCol($sql, $this->_minutesId);
            $maxSort = $result[0];

            if (!$maxSort || $maxSort < 0) {
                $maxSort = 0;
            }
            $this->sortOrder = $maxSort + 1;
        } elseif (is_numeric($this->sortOrder) && ($this->sortOrder > 0) &&
            isset($this->_history['sortOrder']) && ($this->_history['sortOrder'] != $this->sortOrder)) {
            // A sort order was given and differs from the initial value. We need to increment
            // all sort order values equal or above the new value by one, and then update this
            // record with the new value. That should ensure order value consistency.
            $data  = array('sort_order' => new Zend_Db_Expr($this->_db->quoteIdentifier('sort_order') . ' + 1'));
            $where = sprintf('%s = %d and %s >= %d', $this->_db->quoteIdentifier('minutes_id'), $this->_minutesId,
                $this->_db->quoteIdentifier('sort_order'), $this->sortOrder);
            $this->update($data, $where);
        }

        return parent::save();
    }

    /**
     * Define a getter for the "display" field
     *
     * @return integer
     */
    public function getTopicId()
    {
        return 0;
    }

    /**
     * Define a setter for the "display" field
     *
     * @param integer $value The value
     *
     * @return void
     */
    public function setTopicId($value)
    {
        $this->topicId = $value;
    }

    /**
     * Return the display depend on the topicType
     *
     * @return string
     */
    public function getDisplay()
    {
        $translate = Phprojekt::getInstance()->getTranslate();

        switch ($this->topicType) {
            case 1: // Topic
            case 2: // Statement
            case 4: // Decision
                $form = "%1\$s\n%2\$s";
                break;
            case 3: // Todo
                $form = "%1\$s\n%2\$s\n" . $translate->translate('Who') . ": %4\$s\n"
                    . $translate->translate('Date') . ": %3\$s";
                break;
            case 5: // Date
                $form = "%1\$s\n%2\$s\n" . $translate->translate('Date') . ": %3\$s";
                break;
            default:
                $form = $translate->translate('Undefined topicType');
                break;
        }

        return sprintf($form, $this->title, $this->comment, $this->topicDate,
            $this->information->getUserName($this->userId));
    }
}