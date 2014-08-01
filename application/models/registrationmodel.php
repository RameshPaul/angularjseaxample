<?php

class Registrationmodel extends CI_Model {

    public function __construct()
    {
        parent::__construct();
    }

    public function registration($data){
        $this->db->insert('USER_PROFILE', $data);
        return $this->db->insert_id();
    }

}

