<?php

class profilemodel extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function getUserData($data){
        $query = $this->db->get_where('USER_PROFILE', $data);
        $res = array();
        foreach ($query->result() as $row){
            $res[] = $row;
        }
        return $res;
    }

    public function updateUserData($data, $userID){
        $this->db->where('USERID', $userID);
        $res = $this->db->update('USER_PROFILE', $data);
        return $res;
    }

}

