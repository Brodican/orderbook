/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mthree.orderbook.service;

import com.mthree.orderbook.entity.Stock;
import java.math.BigDecimal;
import java.util.List;

/**
 *
 * @author utkua
 */
public interface StockService {
    
    public BigDecimal getChangeForStock(int stock_id);
    public List<Stock> getAllStocks();
    
}
