using BudgetManagment;
using BudgetManagment.Models;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class IncomeController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public IncomeController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("{id}")]
    public IActionResult GetIncome(int id)
    {
        // Validate unique email
        if (!_dbContext.Incomes.Any(i => i.Id == id))
        {
            return Conflict("Wrong id");
        }

        return Ok(_dbContext.Incomes.FirstOrDefault(i => i.Id == id)!.Value);
    }

    [HttpPut("{id}/{income}")]
    public IActionResult UpdateIncome(int id, int income)
    {
        // Validate unique email
        if (!_dbContext.Incomes.Any(i => i.Id == id))
        {
            return Conflict("Wrong id");
        }

        var currentValue = _dbContext.Incomes.FirstOrDefault(i => i.Id == id)!.Value + income;
        _dbContext.Incomes.FirstOrDefault(i => i.Id == id)!.Value = currentValue;
        _dbContext.SaveChanges();
        return Ok(currentValue);
    }
}