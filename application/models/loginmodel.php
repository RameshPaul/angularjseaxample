<?php

class Loginmodel extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function login($data){
        $query = $this->db->get_where('USER_PROFILE', $data);
        $res = array();
        foreach ($query->result() as $row){
            $res[] = $row;
        }
        return $res;
    }

}

