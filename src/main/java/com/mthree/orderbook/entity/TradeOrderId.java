/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mthree.orderbook.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

/**
 *
 * @author utkua
 */
public class TradeOrderId {
    
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer buyid;
    
    private Integer version;
}