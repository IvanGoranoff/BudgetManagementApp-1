﻿using BudgetManagment.DbModels;
using BudgetManagment.Models;
using Microsoft.EntityFrameworkCore;
namespace BudgetManagment;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Expense> Expenses { get; set; }
    public DbSet<Income> Incomes { get; set; }
}