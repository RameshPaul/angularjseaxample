<?php

class Userprofilemodel extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function insert($data){
        $this->db->insert('USER_PROFILE', $data);
        return $this->db->insert_id();
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

